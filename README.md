<h1 align="center">
space-flights
</h>

<h1 align="center">
  <img src="https://eslbrains.com/wp-content/uploads/2018/02/the-future-of-spaceflight.png" width="300">
</h1>

# Description

A simple NodeJs GraphQL service for booking space flights.
> *Unit and integration test are included*

# Sections
This read me contains the following sections

* Developmet setup - *instructions for setting up the local environment and building the docker image. It also has optional instructions for coding and testing requirements*
* Usage - *instructions on how to run/test the project as a docker image*

# Developmet setup

> **A very important first step**
```bash
# initialize the project
npm install
```

## Coding and testing (Optional)
**Want to make changes or test the project locally**

Run the follwing commands
```bash
# create the docker instance for the postgres db
npm run dock-create-db
# migrate and seed the db
npm run migrate-db
npm run seed-db
# run tests
npm test
# if all goes well, run the app
npm start
```

## Building the docker image
**Want to dockerize the project to run it anywhere**

Run the follwing commands
> Required for the *Usage section*
```bash
npm run dock-build
## this will build the space-flights image 
```

# Usage

**Want to run the project which will be available at http://localhost:3000/graphql**

> **Follow the instructions in the *Developmet setup* section to build the docker image**

Run either of the follwing commands sets

> **Set 1** -These commands compose the docker containers for the posgres db and the project. **(The prefered option to run the project)**
```bash
# run the project from a local image
npm run compose-dev
# run the project from an image hosted on DockerHub
npm run compose-prod
```

**or**

> **Set 2** - This command would requires a postgres db instance to be availabe and configured according to the *./knexfile.js*
```bash
npm run dock-run
```
