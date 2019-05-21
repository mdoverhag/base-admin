# Greenfield React Project

[Create React App](https://github.com/facebook/create-react-app) will get you pretty far when setting up a new project. This project is based on a `yarn create react-app` but is more opinionated and will go a bit further in setting up a few useful libraries / helpers for a new React project.


## Libraries / components

Written in [TypeScript](https://www.typescriptlang.org/) as it seems like the more scalable option

Adds a [lint-staged](https://github.com/okonet/lint-staged) hook to run [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) on each new commit

Hooks up [React Router](https://reacttraining.com/react-router/) and adds a simple routing boilerplate

Uses [Material-UI](https://material-ui.com/) for theming, layouts and components

[Formik](https://jaredpalmer.com/formik/) and [Yup](https://github.com/jquense/yup) is added (with some glue components for [Material-UI](https://material-ui.com/)) for productive definitions of forms

[Redux](https://redux.js.org/)/[Reselect](https://github.com/reduxjs/reselect) is often useful but requires a lot of boilerplate to get started, so this is added

[Auth0](https://auth0.com/) (not yet) - opt in to Auth0 using environment variable


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
