## Crypto Exchange Api

This application allows users to manage their cryptocurrency accounts and fetch the latest exchange rates for supported cryptocurrencies and fiat currencies.

## Features

1. Allow to get exchange rate for cryptocurrencies to fiat currencies using the Kraken WebSockets API.
2. The system calculates and stores the balance of each account in the reference currency according to the latest exchange rate.

## Supported Cryptocurrencies

- Bitcoin (BTC)
- Bitcoin Cash (BCH)
- Ethereum (ETH)

## Supported Fiat Currencies

- United States Dollar (USD)
- Euro (EUR)
- Canadian Dollar (CAD)
- Japanese Yen (JPY)
- British Pound (GBP)
- Swiss Franc (CHF)
- Australian Dollar (AUD)

## Technology Stack

- Node.js
- NestJS
- TypeScript
- Prisma
- Jest
- node-cron
- WebSocket
- Kraken API

## Getting Started

### Requirements

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RastaAlex/crypto-exchange-api.git
```

2. Change to the project directory:

```bash
cd crypto-exchange-api
```

3. Install dependencies:

```bash
npm install
```

### Setting up Environment Variables

- Rename the .env.example file in the project root directory to .env.
- Open the .env file in a text editor.
- Set the values for the environment variables.

### Running the Database

The project uses PostgreSQL as the database. You can run the database either locally or in Docker.
For Docker use:

```bash
npm run start:docker:db
```

### Setting up Prisma

Applies migrations to the database specified in the schema.prisma file.

```bash
npx prisma migrate dev --schema src/database/schema.prisma
```

### Running the Application

```bash
npm run start:dev
```
## API Endpoints:

Get Exchange Rates

```bash
GET /crypto/exchange-rate?from=eth&to=usd
```

Returns the current exchange rate for pair: cryptocurrencies to fiat currencies.

Get All Accounts

```bash
GET /accounts
```

Returns a list of all existing accounts.

Get Account by ID

```bash
GET /accounts/:id
```

Returns the account with the specified ID.

Create a New Account

```bash
POST /accounts
```

Creates a new account with the provided data.

You can also view the Swagger documentation for these endpoints by visiting http://localhost:3000/api in your browser after starting the server.

## License

This project is licensed under the [MIT License]
