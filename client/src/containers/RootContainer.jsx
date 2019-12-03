import { connect } from 'react-redux';
import Root from '../components/Root';
import { withRouter } from 'react-router-dom';
import { setWeb3, changeAccount } from '../redux/web3Actions';

export default withRouter(
  connect(
    state => {
      return {
        web3: state.web3Reducer.web3,
        contract: state.web3Reducer.trustMeInstance,
        accounts: state.web3Reducer.accounts
      }
    },
    {
      setWeb3,
      changeAccount
    }
  )(Root)
);
