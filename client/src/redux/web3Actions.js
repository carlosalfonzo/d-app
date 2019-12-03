// action types
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

// actions creators
export const setWeb3 = (web3Connection) => {
  return {
    type: WEB3_CONNECT,
    payload: web3Connection
  }
}
export const changeAccount = (accounts) => {
  return {
    type: CHANGE_ACCOUNT,
    accounts
  }
}