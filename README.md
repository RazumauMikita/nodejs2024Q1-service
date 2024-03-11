# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/RazumauMikita/nodejs2024Q1-service
```

## Installing NPM modules

```
npm install
```

## Create env file

Create .env file (based on .env.example): ./.env

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Use endpoints

http://localhost:4000/

http://localhost:4000/user
http://localhost:4000/user/${:id}

http://localhost:4000/track
http://localhost:4000/track/${:id}

http://localhost:4000/artist
http://localhost:4000/artist/${:id}

http://localhost:4000/album
http://localhost:4000/album/${:id}

http://localhost:4000/favs
http://localhost:4000/favs/track/${:id}
http://localhost:4000/favs/artist/${:id}
http://localhost:4000/favs/album/${:id}

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
