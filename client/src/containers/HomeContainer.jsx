import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../components/Home';
import {
  getProjectsCount
} from '../redux/projectsActions';

export default withRouter(
  connect(
    state => {
      return {
        contract: state.web3Reducer.trustMeInstance,
        accounts: state.web3Reducer.accounts,
        projectsCount: state.projectsReducer.projectsCount
      }
    },
    {
      getProjectsCount
    }
  )(Home)
);