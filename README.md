## Description

A manager for passwords and other sensitive informations, such as: Site credentials, Cards infos, secret notes. Made with NestJS + Express and TypeScript, PostgreSQL as the database and Prisma as ORM.

You can see all the endpoints and infos related to them on the Documentation powered by Swagger on the deploy [here](https://drivenpass-823k.onrender.com/api) or after running the app, go to the `'/api'` route.

![image](https://github.com/lucasnerism/drivenpass-nest/assets/94038894/d58879cc-93b6-430a-9b2f-df283b97bc7e)
![image](https://github.com/lucasnerism/drivenpass-nest/assets/94038894/3f60f4c2-3dd7-4809-8941-22f7393571e5)


## Installation

```bash
$ git clone https://github.com/lucasnerism/securepass-nest
$ cd securepass-nest
$ npm install
```

## Create a Database
Create a PostgreSQL database with whatever name you want


## Setup the ENVs
Configure a `.env.development` and a `.env.test` in the root of your application using the `.env.example` as a basis.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```
