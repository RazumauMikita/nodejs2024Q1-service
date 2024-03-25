# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/RazumauMikita/nodejs2024Q1-service
```

## Change branch

Chose `docker` brunch

## Change directory

```
cd nodejs2024Q1-service
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Create env file

Create .env file (based on .env.example): ./.env
Set your password in .env DB_PASSWORD='your_pass'

## Run Docker compose

```
docker compose up
```

## Check migration

Migration into container doesn't work. You can start migrate locally.

1. Set DB_HOST value in .env to "localhost".
2. Start postgres database or new container.
3. disable synchronize in app.module
4. Drop tables in database if they exist.

```
npm run build
npm run migration:run
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
