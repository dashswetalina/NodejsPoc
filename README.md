
This project  includes support for Swagger UI
# Pre-requisites
Install Node.js version > 12.0.1

# Install, Configure & Run

# Clone the repo.
git clone <repourl>;

# Goto the cloned project folder.
cd NodejsPoc;

# Install NPM dependencies.
npm install;

# Run the app
npm start;

# Technology Stack
Node.js
TypeScript
Express

# Functionality and Design
The application must expose restful endpoints that will parse data (passed in the request body) and return the value back to the
client. The API will have two versions and depending on the version endpoint, the parsing of the data will return a different value back to the client. Use TypeScript interfaces so the code assumes the design / object properties.

# Endpoints
/api/v1/parse (POST)
/api/v2/parse (POST)

Navigate to http://localhost:8000

# API Document endpoints

swagger-ui Endpoint : http://localhost:8000/api/docs

# TSLint
TSLint is a code linter that helps catch minor code quality and style issues.

# TSLint rules
All rules are configured through tslint.json.

# Running TSLint
To run TSLint you can call the main build script or just the TSLint task.

npm run lint  // runs only TSLint