import { WEB3_CONNECT, WEB3_CONNECT_ERROR } from './web3Actions';

const initialState = {
  web3: false,
  accounts: [],
  trustMeInstance: null,
  error: null
};

export default function responsiveReducer(state = initialState, action) {
  switch (action.type) {
    case WEB3_CONNECT:
      return {
        ...state,
        web3: true,
        accounts: action.meta.accounts,
        trustMeInstance: action.meta.smartContractInstance
      }
    case WEB3_CONNECT_ERROR:
      return {
        ...state,
        web3: false,
        error: action.meta
      }
    default:
      return state;
  }
}