# How to run minimal application for dev development on Mac

## 1. install some tools:

```bash
# Install HomeBrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install required packages
brew install nvm git
```

- Run `open ~/.zshrc` or `open ~/.bashrc`, if the file doesn't exist, create it. If you don't know which one you need, see the [doc](https://support.apple.com/en-gb/HT208050)

- Add next lines to the bottom of the file:

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

export SHOW_DB_QUERY_LOGGER=false
export SHOW_MIGRATIONS_QUERY_LOGGER=false
```

- Run next commands to install Node.js with required version:

```bash
nvm install 16.5.0
nvm use 16.5.0
nvm alias default 16.5.0
```

## 2. Install Docker:

// TODO

## 3. Download the project:

- Configure SSH [#1](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), [#2](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- Execute next command:

```bash
git clone // TODO
```

## 4. Install postgres:

// TODO

## 5a. Run without Docker:

```bash
# install all packages
<repo-root-folder>$ yarn install --pure-lockfile

# Build the project
<repo-root-folder>$ npm run build

# Run the develop backend application
<repo-root-folder>$ npm run start:dev
```

## 5b. Run with Docker:

```bash
# install all packages
<repo-root-folder>$ yarn install --pure-lockfile

# Build modules
<repo-root-folder>$ npm run docker:build:modules

# Build and Run main database
<repo-root-folder>$ docker compose --build -d main-db

# Build and Run backend
<repo-root-folder>$ docker compose --build -d backend
```

## 6. Specific commands:

// TODO
