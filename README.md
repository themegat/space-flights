# space-flights

# Sections
This read me contain the following sections

* Developmet setup - *these are instructions for setting up the local environment and building the docker image. It also has optional instructions for coding and testing requirements*
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

**If the building the docker image was a success and you want to run the project**

> Follow the instruction in the *Developmet setup* section to build the docker image

Run either of the follwing commands
> **This command would requires a postgres db instance to be availabe and configure according to the knexfile.js**
```bash
npm run dock-run
```

