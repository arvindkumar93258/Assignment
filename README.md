
## Description
- This project is all about implementing the given assignment by hyperhire for the role of Nestjs and blockchain developer.

  ## Requirement
- Nest.js
- Use Moralis or Solscan API
- Relational Database System
- Swagger
- Clean code
- Dockerize to runnable on my local computer.
    - Should be run all the program by one “docker compose up (—build)” command


## Feature

1. Automatically save the Price of **Ethereum and Polygon every 5 minutes**
2. Automatically send an email to “hyperhire_assignment@hyperhire.in” if the price of a chain increases by more than 3% compared to its price one hour ago
3. API - returning the prices of each hour (within 24hours)
4. API  - setting alert for specific price.(parameters are chain, dollar, email)

```bash
EXAMPLE
1. User can set alert 1000 dollar for ethereum
2. If ethereum goes 1000 dollar it send email.
```

5. API - get swap rate (eth to btc)
    1. input is ethereum amount
    2. return values are
        1. how much btc can get
        2. total fee (eth, dollar)(fee percentage is 0.03)
6. no user authentication required.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- start the project after cloning into vs code or any similar code editor
- Go to terminal with same directory and run `npm i`
- then 

## Stay in touch

- Author - Arvind Kumar Sahu
- Linkedin - www.linkedin.com/arvind-kumar-sahu-401ba0195


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
