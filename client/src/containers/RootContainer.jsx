import { connect } from 'react-redux';
import Root from '../components/Root';
import { withRouter } from 'react-router-dom';
import { setWeb3, web3Error } from '../redux/web3Actions';

export default withRouter(
  connect(
    state => {
      return {
        web3: state.web3Reducer.web3,
      }
    },
    {
      setWeb3,
      web3Error
    }
  )(Root)
);
