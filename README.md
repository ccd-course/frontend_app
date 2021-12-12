[![Build and Publish](https://github.com/ccd-course/frontend_app/actions/workflows/main.yml/badge.svg)](https://github.com/ccd-course/frontend_app/actions/workflows/main.yml)

# Chess frontend
This frontend is written with [React](https://reactjs.org/) and belongs to [chess_backend](https://github.com/ccd-course/chess_backend).

## Run locally
### Frontend only
#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Complete stack
```
git clone git@github.com:ccd-course/frontend_app.git
cd frontend_app
docker-compose up
```

## Auto deployment
The develop branches of [frontend](https://github.com/ccd-course/frontend_app) and [backend](https://github.com/ccd-course/chess_backend) are auto deployed via Github Actions on every commit:
- [chess.valentinriess.com](https://chess.valentinriess.com)
- [backend.chess.valentinriess.com](https://backend.chess.valentinriess.com)
