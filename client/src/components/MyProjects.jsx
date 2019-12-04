import React, { Fragment } from 'react';
import './css/MyProjects.css';
import Loader from './Loader';
import trustMe from '../assets/img/TrustMeError.png';
import { changeDocumentTitle } from '../globals/utils';
import { Link } from 'react-router-dom';
import ProjectRowContainer from '../containers/ProjectRowContainer';

export default class MyProjects extends React.Component {
  componentDidMount() {
    const { getMyProjectsCount, contract, address } = this.props;
    getMyProjectsCount(contract, address);
    changeDocumentTitle('My Projects');
  }
  componentDidUpdate({ address: prevAccount }) {
    const { getMyProjectsCount, contract, address } = this.props;
    if (prevAccount !== address) {
      getMyProjectsCount(contract, address);
    }
  }
  renderProjectsList() {
    const { projectsIndexes } = this.props;
    return (
      <div className='my-projects-list-container flex full-width third-background'>
        <div className='my-projects-scroll-container full-width flex wrap'>
          {
            projectsIndexes.map(
              (projectIndex, index) => <ProjectRowContainer key={`project-list-item-${parseInt(projectIndex)}`} projectIndex={parseInt(projectIndex)} />
            )
          }
        </div>
      </div>
    )
  }
  emptyProjects() {
    return (
      <div className='empty-projects-container full-width flex wrap'>
        <div className='image-container full-width flex-center'>
          <img src={trustMe} alt="error" className='trustme-logo' />
        </div>
        <div className='message-container full-width flex-center wrap'>
          <p className='full-width five-color'>It seems like you have no projects jet</p>
          <Link className='full-width main-color' to='/new-project'>
            <p className='full-width main-color'>¡Let's create a new One!</p>
          </Link>
        </div>
      </div>
    )
  }
  render() {
    const { loading, projectsIndexes } = this.props;
    return (
      <Fragment>
        {
          loading ? <Loader /> : (
            <div className='MyProjects-container flex wrap full-width'>
              <p className='count-message main-color bold'>{`You Have ${projectsIndexes.length} Projects`}</p>
              {
                projectsIndexes.length && this.renderProjectsList()
              }
              {
                !projectsIndexes.length && this.emptyProjects()
              }
            </div>
          )
        }
      </Fragment>
    )
  }
}