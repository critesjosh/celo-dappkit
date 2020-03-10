import React from 'react';
import './global';
import { web3, kit } from './root'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox } from 'react-native';
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import { CeloContract } from '@celo/contractkit'
import { toTxResult } from "@celo/contractkit/lib/utils/tx-result";
import { Linking } from 'expo'
import HelloWorldContract from './contracts/HelloWorld.json'


YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream']);

export default class App extends React.Component {

  state = {
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    helloWorldContract: {},
    contractName: '',
    textInput: ''
  }

  componentDidMount = async () => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloWorldContract.networks[networkId];

    const instance = new web3.eth.Contract(
      HelloWorldContract.abi,
      deployedNetwork && deployedNetwork.address,
      { from: this.state.account }
    );

    this.setState({ helloWorldContract: instance })
  }

  login = async () => {
    const requestId = 'login'
    const dappName = 'Hello Celo'
    const callback = Linking.makeUrl('/my/path')
  
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
  
    const dappkitResponse = await waitForAccountAuth(requestId)

    kit.defaultAccount = dappkitResponse.address

    const stableToken = await kit.contracts.getStableToken()

    const [cUSDBalanceBig, cUSDDecimals] = await Promise.all([stableToken.balanceOf(kit.defaultAccount), stableToken.decimals()])
    let cUSDBalance = cUSDBalanceBig.toString()
    this.setState({ cUSDBalance, isLoadingBalance: false })

    this.setState({ address: dappkitResponse.address, phoneNumber: dappkitResponse.phoneNumber })
  }

  read = async () => {
    let name = await this.state.helloWorldContract.methods.getName().call()
    this.setState({ contractName: name })
  }

  write = async () => {
    const requestId = 'update_name'
    const dappName = 'Hello Celo'
    const callback = Linking.makeUrl('/my/path')

    const txObject = await this.state.helloWorldContract.methods.setName(this.state.textInput)

    requestTxSig(
      kit,
      [
        {
          from: this.state.address,
          to: this.state.helloWorldContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    )

    const dappkitResponse = await waitForSignedTxs(requestId);
    const tx = dappkitResponse.rawTxs[0];
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Hello World contract update transcation receipt: `, result)  
  }

  onChangeText = async (text) => {
    this.setState({textInput: text})
  }

  render(){
    return (
      <View style={styles.container}>
        <Image resizeMode='contain' source={require("./assets/white-wallet-rings.png")}></Image>
        <Text>Open up client/App.js to start working on your app!</Text>
        
        <Text style={styles.title}>Login first</Text>
        <Button title="login()" 
          onPress={()=> this.login()} />
                <Text style={styles.title}>Account Info:</Text>
        <Text>Current Account Address:</Text>
        <Text>{this.state.address}</Text>
        <Text>Phone number: {this.state.phoneNumber}</Text>
        <Text>cUSD Balance: {this.state.cUSDBalance}</Text>

        <Text style={styles.title}>Read HelloWorld</Text>
        <Button title="Read Contract Name" 
          onPress={()=> this.read()} />
        <Text>Contract Name: {this.state.contractName}</Text>
        
        <Text style={styles.title}>Write to HelloWorld</Text>
        <Text>New contract name:</Text>
        <TextInput
          style={{  borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }}
          placeholder="input new name here"
          onChangeText={text => this.onChangeText(text)}
          value={this.state.textInput}
          />
        <Button style={{padding: 30}} title="update contract name" 
          onPress={()=> this.write()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35d07f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 8, 
    fontSize: 20, 
    fontWeight: 'bold'
  }
});
