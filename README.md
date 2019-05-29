# Greenfield React Project

[Create React App](https://github.com/facebook/create-react-app) will get you pretty far when setting up a new project. This project is based on a `yarn create react-app` but is more opinionated and will go a bit further in setting up a few useful libraries / helpers for a new React project.


## Libraries / components

Written in [TypeScript](https://www.typescriptlang.org/) as it seems like the more scalable option

Adds a [lint-staged](https://github.com/okonet/lint-staged) hook to run [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) on each new commit

Hooks up [React Router](https://reacttraining.com/react-router/) and adds a simple routing boilerplate

Uses [Material-UI](https://material-ui.com/) for theming, layouts and components

[Formik](https://jaredpalmer.com/formik/) and [Yup](https://github.com/jquense/yup) is added (with some glue components for [Material-UI](https://material-ui.com/)) for productive definitions of forms

[Redux](https://redux.js.org/)/[Reselect](https://github.com/reduxjs/reselect) is often useful but requires a lot of boilerplate to get started, so this is added

[Auth0](https://auth0.com/) passwordless login is added. I was hoping I could add some SPA authentication that would "just work" but it turned out only using Auth0 is not ideal. The implementation added here is just a placeholder to get started with a demo and needs to be replaced.


## Set up Auth0

Auth0 can handle passwordless login and comes with email-templates and brute-force protection needed to easily hook up a demo/development version of an app. Steps to set up:

Create a new tenant in Auth0. Create a new Application set to type Single Page Application 

Add Allowed Callback URLs (assuming localhost for development and a netlify app):
```
http://localhost:3000/login/callback, https://demo.yoururl.com/login/callback
```

Add Allowed Web Origins (assuming localhost for development and a netlify app):
```
http://localhost:3000, https://demo.yoururl.com
```

For development, create a file `.env.local` and set the following variables:

```bash
REACT_APP_AUTH0_DOMAIN="example.au.auth0.com"
REACT_APP_AUTH0_CLIENT_ID="rqap************************yfWd"
```

For deployment to Netlify, add these same variables to your build.


### Limitation Development

Auht0 leverages third-party cookies to perform the authentication of the user. You will have to white-list your auth0 domain (`example.au.auth0.com`) in your web-browser to make it work.


### Limitation Deployed Version

Auth0 leverages third-party cookies to perform the authentication. The only viable option in this case is to go into the non-free tier of Auth0 and add your domain and putting the cookie under the same domain as the app.


### Usage of Local Storage

Without any persistence of Auth0 tokens the user will be forced to do a log-in every time the app is closed and re-opened again. This might be OK if using a third-party provider E.g. Google or GitHub but for email-based passwordless authentication this becomes a big nuisanse.

As such, this version of the app just stores the tokens to `localStorage`. Note that this cannot be used in a production setting. See [this](https://auth0.com/docs/security/store-tokens#if-a-backend-is-present) and [this](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/HTML5_Security_Cheat_Sheet.md#local-storage) article.

Auth0 are also doing changes in their recommendations for SPA's, find more information in [this](https://auth0.com/blog/oauth2-implicit-grant-and-spa/) article.


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
