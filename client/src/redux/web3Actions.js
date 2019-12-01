// action types
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const WEB3_CONNECT_ERROR = 'WEB3_CONNECT_ERROR';

// actions creators
export const setWeb3 = (accounts) => {
  return {
    type: WEB3_CONNECT,
    meta: accounts
  }
}
export const web3Error = (error) => {
  return {
    type: WEB3_CONNECT_ERROR,
    meta: error
  }
}