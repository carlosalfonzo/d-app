import React, { Component, Fragment } from 'react';
import getWeb3 from "../getWeb3";
import TrustMe from "../contracts/TrustMe.json";
import ConnectToMetamaskView from './ConnectToMetamask';
import Header from './Header';

let push = null;
export const pushHistory = (route, state) => {
  if (push) {
    push(route, state);
  }
}

export default class Root extends Component {
  constructor(props) {
    super(props);
    push = props.history.push;
    this.connectWeb3 = this.connectWeb3.bind(this);
  }

  componentDidMount() {
    this.props.setWeb3(this.connectWeb3());
  }

  async createProjects(projectsCount, contract, accounts) {
    for (let i = 0; i < projectsCount; i++) {
      let project = await contract.methods.addProject(
        `My project ${i}`,
        'my project description',
        10,
        1000,
        50
      ).send({
        from: accounts[0]
      });
    }
  }

  async connectWeb3() {
    try {
      const web3 = await getWeb3(); // Get network provider and web3 instance.
      const accounts = await web3.eth.getAccounts(); // Use web3 to get the user's accounts.
      const networkId = await web3.eth.net.getId(); // Get the contract instance.
      const deployedNetwork = TrustMe.networks[networkId];
      const trustMeContractInstance = new web3.eth.Contract(
        TrustMe.abi,
        deployedNetwork && deployedNetwork.address
      );
      window.ethereum.on('accountsChanged', this.props.changeAccount);
      // await this.createProjects(2, trustMeContractInstance, accounts);
      return { accounts, trustMeContractInstance };
    } catch (error) {
      return error;
    }
  }

  render() {
    const { children, web3 } = this.props;
    if (!web3) {
      return <ConnectToMetamaskView />;
    } else {
      return (
        <Fragment>
          <Header />
          <div className='body-content-wrapper full-width max-width'>
            {children}
          </div>
        </Fragment>
      );
    }
  }
}