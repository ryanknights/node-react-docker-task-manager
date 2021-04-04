# Node & React Task Board

A simple application built for managing task lists. Frontend is built using React and backend is built using Node & MySQL.

## Installation

Application can be started using Docker.

```bash
docker-compose build
docker-compose up
```

Once started, the application can be viewed by browsing to http://localhost:3000

There are various images:
- `mysql` - MySQL DB for backend
- `mysql-test` - MySQL DB for backend tests
- `server` - Node/Express API application
- `server-test` - Node/Express API for backend tests
- `client` - React application for frontend.

## Backend Tests

Backend tests can be run using the test docker images.
```bash
docker-compose up mysql-test server-test
```

## Frontend Tests

Frontend tests can be run using `yarn test` inside the `client` directory.

## Future Improvements
- Use Redux or similar state management in frontend to avoid fetching lists after most actions.
- Add drag/drop to frontend.
- Add validation to frontend forms.
- Add more comprehensive error handling for frontend network requests.  
- Add more comprehensive tests for frontend components.
- Complete backend route tests.
- Add better validation to backend routes. 
