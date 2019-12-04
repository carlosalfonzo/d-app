import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MyProjects from '../components/MyProjects';
import {
  getMyProjectsCount,
  getProject
} from '../redux/projectsActions';

export default withRouter(
  connect(
    (state) => {
      return {
        contract: state.web3Reducer.trustMeInstance,
        address: state.web3Reducer.accounts[0],
        projectsIndexes: state.projectsReducer.myProjectsIndexes
      }
    },
    {
      getMyProjectsCount,
      getProject
    }
  )(MyProjects)
);