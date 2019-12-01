// action types
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const WEB3_CONNECT_ERROR = 'WEB3_CONNECT_ERROR';

// actions creators
export const setWeb3 = (accounts, smartContractInstance) => {
  return {
    type: WEB3_CONNECT,
    meta: {
      accounts: accounts,
      smartContractInstance: smartContractInstance
    }
  }
}
export const web3Error = (error) => {
  return {
    type: WEB3_CONNECT_ERROR,
    meta: error
  }
}
// await contract.methods.set(5).send({ from: accounts[0] });
// const response = await contract.methods.get().call();
