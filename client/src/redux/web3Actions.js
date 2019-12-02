// action types
export const WEB3_CONNECT = 'WEB3_CONNECT';
export const WEB3_CONNECT_ERROR = 'WEB3_CONNECT_ERROR';

// actions creators
export const setWeb3 = (web3Connection) => {
  return {
    type: WEB3_CONNECT,
    payload: web3Connection
  }
}