import { connect } from 'react-redux';
import ProjectCard from '../components/ProjectCard';
import { getProject } from '../redux/projectsActions';

export default connect(
  (state, { projectIndex }) => {
    return {
      contract: state.web3Reducer.trustMeInstance,
      address: state.web3Reducer.accounts[0],
      project: state.projectsReducer.projects[projectIndex],
      loading: state.projectsReducer.projectsLoader[projectIndex] !== undefined ? state.projectsReducer.projectsLoader[projectIndex] : true,
    }
  },
  {
    getProject
  }
)(ProjectCard)
