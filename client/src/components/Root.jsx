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
  }

  componentDidMount() {
    this.connectWeb3();
  }

  async connectWeb3() {
    try {
      const web3 = await getWeb3(); // Get network provider and web3 instance.
      const accounts = await web3.eth.getAccounts(); // Use web3 to get the user's accounts.
      const networkId = await web3.eth.net.getId(); // Get the contract instance.
      const deployedNetwork = TrustMe.networks[networkId];
      const TrustMeContractInstance = new web3.eth.Contract(
        TrustMe.abi,
        deployedNetwork && deployedNetwork.address
      );
      this.props.setWeb3(accounts, TrustMeContractInstance);
    } catch (error) {
      this.props.web3Error(error);
    }
  }

  render() {
    const { children, web3 } = this.props;
    if (!web3) {
      return <ConnectToMetamaskView />
    }
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