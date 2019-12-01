import { connect } from 'react-redux';
import Home from '../components/Home';
import { withRouter } from 'react-router-dom';

export default withRouter(
  connect(
    state => {
      return {
        web3: state.web3Reducer.web3
      }
    }
  )(Home)
);
