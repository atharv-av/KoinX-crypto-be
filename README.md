# Cryptocurrency Data Fetcher

This project is a server-side application built using Node.js and MongoDB. It fetches and stores the current price, market cap, and 24-hour change of cryptocurrencies (Bitcoin, Matic, and Ethereum) using the CoinGecko API. Additionally, it includes functionality to generate dummy data for testing purposes.

## Features

- Fetches and stores cryptocurrency data from the CoinGecko API every 2 hours.
- API endpoints to retrieve the latest data and standard deviation of prices.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **Axios**: Promise-based HTTP client for making API requests.
- **Node-Cron**: Scheduling library for running background tasks.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (either locally or using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/atharv-av/KoinX-crypto-be/
   cd ./KoinX-crypto-be

2. Install the dependencies:
   ```bash
   npm install

3. Configuration
   - MongoDB Connection: Update the MongoDB connection string in your code (if needed) to connect to your MongoDB instance.
   ```javascript
    mongoose.connect('mongodb://localhost:27017/cryptoData', {
      dbName: "KoinX",
    });`

4. Run the application
   ```bash
   node app.js
