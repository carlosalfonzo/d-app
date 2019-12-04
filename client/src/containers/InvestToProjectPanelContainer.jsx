import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvestToProjectPanel from '../components/InvestToProjectPanel';
import { investInProject } from '../redux/projectsActions';

export default withRouter(
  connect(
    (state, { projectIndex }) => {
      return {
        contract: state.web3Reducer.trustMeInstance,
        address: state.web3Reducer.accounts[0],
        project: state.projectsReducer.projects[projectIndex],
        loading: state.projectsReducer.loading
      }
    },
    {
      investInProject
    }
  )(InvestToProjectPanel)
)