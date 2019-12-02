import { WEB3_CONNECT, WEB3_CONNECT_ERROR } from './web3Actions';
import { actions_suffix } from '../globals/configs';
const {
  START,
  SUCCESS,
  ERROR
} = actions_suffix;

const initialState = {
  web3: false,
  loading: false,
  accounts: [],
  trustMeInstance: null,
  error: null
};

export default function web3Reducer(state = initialState, action) {
  switch (action.type) {
    case WEB3_CONNECT + START:
      return {
        ...state,
        loading: true
      }
    case WEB3_CONNECT + ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case WEB3_CONNECT + SUCCESS:
      return {
        ...state,
        loading: false,
        web3: true,
        accounts: action.payload.accounts,
        trustMeInstance: action.payload.trustMeContractInstance.methods
      }
    case WEB3_CONNECT_ERROR:
      return {
        ...state,
        web3: false,
        error: action.error
      }
    default:
      return state;
  }
}