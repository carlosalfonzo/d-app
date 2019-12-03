import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProjectView from '../components/ProjectView';
import { getProject } from '../redux/projectsActions';

export default withRouter(
  connect(
    (state, { match: { params: { id } } }) => {
      return {
        contract: state.web3Reducer.trustMeInstance,
        address: state.web3Reducer.accounts[0],
        project: state.projectsReducer.projects[id],
        loading: state.projectsReducer.projectsLoader[id] !== undefined ? state.projectsReducer.projectsLoader[id] : true,
      }
    },
    {
      getProject
    }
  )(ProjectView)
)