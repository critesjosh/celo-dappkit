# Hello Celo Truffle Box

[![Greenkeeper badge](https://badges.greenkeeper.io/critesjosh/celo-dappkit.svg)](https://greenkeeper.io/)

Make sure that you have the [Yarn package manager](https://yarnpkg.com/) installed.

Use this Truffle Box to get started building a mobile dapp using Celo and React Native in Typescript. We will build a simple React Native application that we can use to read and update a contract on the Alfajores test network.

## Smart contract development

You can migrate the `HelloWorld.sol` contract to the alfajores test network with
```bash
$ truffle migrate --network alfajores
```
To run a local development Celo blockchain, use the Celo fork of `ganache-cli`. You can find the package details and install instructions [here.](https://www.npmjs.com/package/@celo/ganache-cli)

If you want to migrate to a public development network, you will need to get funded from the appropriate faucet. 
 - [Alfajores faucet](https://celo.org/developers/faucet)

The account you will be deploying from is the account associated with the private key in the `./secret` file (if you are deploying to the Alfajores test network). This file comes empty, but a private key will be generated for you and your account address will be printed in the console with `$ npm run account`.

You should deploy the `HelloWorld.sol` contract to work through the exercise. You can deploy it using the remote node specified in `truffle-config.js`. You may get an error about connecting to a running RPC client. If you run into the error, trying running `truffle migrate --network alfajores` again. A successful deployment should print something similar to the following:

```
Joshs-MacBook-Pro-2:untitled folder joshcrites$ truffle migrate --network alfajores

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'alfajores'
> Network id:      44786
> Block gas limit: 0x1312d00


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x8a7d5f323ef9e356407566ded4d191e3b68b0ba579c5a7b920e5dea3936bb101
   > Blocks: 0            Seconds: 4
   > contract address:    0x6363f95B5dDe5bbb1A73dbdc752036e105769207
   > block number:        587188
   > block timestamp:     1583779418
   > account:             0x0ac6eDb733EAB57f8fa6c0F8678de0b9ef950bc6
   > balance:             4.98552399999999992
   > gas used:            188419
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00376838 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00376838 ETH


2_deploy_contracts.js
=====================

   Deploying 'HelloWorld'
   ----------------------
   > transaction hash:    0xb48d8f2da01f49b6ebe3dd2391b289c735afd2ec1b57902a5bd3958c4b5773b3
   > Blocks: 1            Seconds: 4
   > contract address:    0xD9BBC1c3C76bd285C33de5Df4b987369EC66DC56
   > block number:        587190
   > block timestamp:     1583779428
   > account:             0x0ac6eDb733EAB57f8fa6c0F8678de0b9ef950bc6
   > balance:             4.979126059999999888
   > gas used:            277896
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00555792 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00555792 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.0093263 ETH
```
You can look up the contract deployment transaction on the Alfajores block explorer via the transaction hash, [https://alfajores-blockscout.celo-testnet.org/tx/0xb48d8f2da01f49b6ebe3dd2391b289c735afd2ec1b57902a5bd3958c4b5773b3](https://alfajores-blockscout.celo-testnet.org/tx/0xb48d8f2da01f49b6ebe3dd2391b289c735afd2ec1b57902a5bd3958c4b5773b3) in this case.

Truffle will save the deployment information to the Truffle artifact located at `client/contracts/HelloWorld.json`. You will use this deployment information to connect your React Native application to the correct contract.

## Developing the mobile application

Keep in mind that you will need a version of the Celo Wallet installed on the mobile device with which you are developing the application. The Celo Wallet is the private key management software used to sign transations for the user. 

### Using an emulator

You can run a development build of the Celo Wallet and use it on an emulated device. To do so, follow the instructions [here.](https://github.com/celo-org/celo-monorepo/tree/master/packages/mobile)

Once you have a device with the Celo wallet installed, you can start working on the your application. For the purposes of introduction, we have added some code to you get you started located in App.tsx in the project root.

### Application development with Expo

[Expo](#) is a tool that makes developing React Native applications much easier. We will be using Expo for easy setup.

Install it with:
```
$ npm install expo-cli --global
```

You can start the application with
```
$ expo start
```

Since we are developing this on the public Alfajores test network, we can view all of the accounts, contracts and transactions on the [public block explorer](https://alfajores-blockscout.celo-testnet.org/).