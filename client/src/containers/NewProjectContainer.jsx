import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewProject from '../components/NewProject';
import { postNewProject } from '../redux/projectsActions';

export default withRouter(
  connect(
    (state) => {
      return {
        contract: state.web3Reducer.trustMeInstance,
        address: state.web3Reducer.accounts[0],
        loading: state.projectsReducer.loading,
        success: state.projectsReducer.success,
        error: state.projectsReducer.error
      }
    },
    {
      postNewProject
    }
  )(NewProject)
);