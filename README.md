# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/YuliiaZas/nodejs2025Q2-service
```

## Change directory to the project root

```
cd nodejs2025Q2-service
```
## Change branch to `development`

```
git checkout development
```

## Installing NPM modules

```
npm install
```

## Environment variables
Create a `.env` file in the root directory of the project

```
cp .env.example .env
```

and add the following variables:

```
PORT=4000
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Generating OpenAPI documentation
To generate OpenAPI documentation, run the following command:

```
npm run generate:doc
```
This will create a `doc/api.yaml` file containing the OpenAPI documentation.

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
