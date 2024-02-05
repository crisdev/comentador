# Comentador

_Comentador_ is a project that aims to translate source code written in Go or Prolog into natural language comments using NLP techniques.
It consists of:

1. A Visual Studio Code Extension, for user interaction (this repo).
1. A [trained ML model](https://github.com/crisdev/finetuning-goprolog) based on transformers, which provides translations services.
1. A [dataset](https://huggingface.co/datasets/crisdev/goprolog) created from scratch.

## 🚀 Quick Start

As mentioned, this repo hosts the extension for VSCode and it is provided as support for an API in DockerHub, which contains the trained model.
So to make it work, you must first deploy the [Docker application](https://hub.docker.com/r/borgesvive/goprolog-backend):

```bash
docker run -dp 8000:1400 borgesvive/goprolog-backend:v1
```

You may run a specific model (PROLOG or GO) through an environment variable.

```bash
docker run -e MODEL="GO" -dp 8000:1400 borgesvive/goprolog-backend:v1
```

Once the backend is running, then you must download and install the [VSCode extension](https://github.com/crisdev/comentador/releases/tag/v1.0.0).

1. In VSCode, select a function in Prolog or Go, as appropriate.
1. Invoke the command palette with `Ctrl+Shift+P` and search for "Comentar código".
1. Next, select the language.

You can adjust the server URL (which defaults to localhost) within the configuration tab of the extension in VSCode.
