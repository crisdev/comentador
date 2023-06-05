import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'comentador.comentar',
    async () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      const language = await vscode.window.showQuickPick(['Go', 'Prolog'], {
        placeHolder: 'Seleccione un lenguaje',
      });

      let selection = editor.selection;

      if (language === undefined || selection.isEmpty) {
        return;
      }

      let code = editor.document
        .getText(selection)
        .replace(/(\r\n|\n|\r)/gm, '') // remove newlines
        .replace(/\s+/g, ' ') // remove extra spaces
        .trim();

      // Get path to server (default localhost:8000)
      const url = `${
        vscode.workspace.getConfiguration('comentador').url
      }/predict`;

      let res = null;

      try {
        res = await axios({
          url,
          method: 'POST',
          data: {
            language,
            code,
          },
        });
      } catch (e) {
        vscode.window.showErrorMessage('No se pudo conectar con el servidor!');
        return;
      }

      // Get the start position of the selection
      const selectionStart = editor.selection.start;

      const output = `/* ${res.data?.prediction} */`;

      // Create a TextEdit that inserts the output before the selection
      const edit = new vscode.TextEdit(
        new vscode.Range(
          selectionStart.line,
          selectionStart.character,
          selectionStart.line,
          selectionStart.character
        ),
        output + '\n' // add a newline to separate the output from the selection
      );

      // Apply the TextEdit to the document
      editor.edit((editBuilder) => {
        editBuilder.insert(selectionStart, output + '\n');
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
