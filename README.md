# VSCode Extension

This extension for VSCode is provided as support for an API hosted on DockerHub.
To make it work, you must first deploy the [Docker application](https://hub.docker.com/r/borgesvive/goprolog-backend).

```bash
docker run -dp 8000:1400 borgesvive/goprolog-backend:v1
```

You may run a specific model (PROLOG or GO) through an environment variable.

```bash
docker run -e MODEL="GO" -dp 8000:1400 borgesvive/goprolog-backend:v1
```

First you must download and install the extension.

Once running, in VSCode, select a function in Prolog or Go, as appropriate.
Then invoke the command palette with `Ctrl+Shift+P` and search for "Comentar código"
Next, select the language.

In the extension configuration, it is possible to modify the server URL.
