# Base Admin

Template coupled with [base_server](https://github.com/mdoverhag/base_server) to handle Admin CRUD operations for new projects.

## Setup Instructions

Go to [base-admin](https://github.com/mdoverhag/base-admin) and create a new project using template

Clone and rebrand
```bash
git clone git@github.com:mdoverhag/your-admin.git
cd your-admin
./bin/rename.sh your-admin
git add .
git commit -m "Rebranded project"
```

Install and verify
```bash
yarn
yarn test
```

## Development

Start development server
```bash
yarn start
```

Will try to login to `http://localhost:4000/api`. Any generated token will be stored in localstorage.

## Production

The project [base_server](https://github.com/mdoverhag/base_server) uses session based authentication for production. During the build of the [base_server](https://github.com/mdoverhag/base_server) Docker image, [base-admin](https://github.com/mdoverhag/base-admin) will be built using `yarn build` and served as static content. `index.html` will be changed into an Phoenix template where a user token can be injected in the presense of a valid session.