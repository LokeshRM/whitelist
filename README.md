
# Whitelist

A Dapp stores ETH address on chain, provides whitelist address getting pre-approved to mint an NFT at some predefined date and time
## Demo

![demo_whitelist](https://user-images.githubusercontent.com/98147030/173061949-65aab29c-373a-4ef3-a092-0632662d8ec0.gif)

## Deployment

- Fork the repository.

- Clone the repo
   ```sh
   git clone https://github.com/<YOUR_USERNAME>/whitelist.git
   ```

- Open your terminal/cmd in the `whitelist/my-app` folder

- Install yarn
   ```sh
   npm install --global yarn
   ```

- Install dependencies
   ```sh
   yarn
   ```

- Run `yarn start` to start the development server.


## Running Tests

- Open your terminal/cmd in the `whitelist/SmartContract` folder

- Install yarn
   ```sh
   npm install --global yarn
   ```

- Install dependencies
   ```sh
   yarn
   ```

- Run `npx hardhat run --network hardhat scripts/deploy.js` to deploy smart-contract within hardhat network.

- Run test scripts or test over development server
