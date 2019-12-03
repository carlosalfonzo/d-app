import React, { Fragment } from 'react';
import './css/Home.css';
import Loader from './Loader';
import { changeDocumentTitle } from '../globals/utils';
import ProjectCardContainer from '../containers/ProjectCardContainer';

export default class Home extends React.Component {
  componentDidMount() {
    const { getProjectsCount, contract, accounts } = this.props;
    getProjectsCount(contract, accounts);
    changeDocumentTitle('TrustMe & Invest in Future', true);
  }
  renderProjectsList() {
    const { projectsCount } = this.props;
    let arrayToMap = new Array(projectsCount).fill('foo');
    return (
      <div className='projects-list-container flex wrap full-width'>
        {
          arrayToMap.map(
            (_, index) => <ProjectCardContainer key={`project-list-item-${index}`} projectIndex={index} />
          )
        }
      </div>
    )
  }
  render() {
    const { loading, projectsCount } = this.props;
    return (
      <Fragment>
        {
          loading ? <Loader /> : (
            <div className='home-container flex wrap full-width'>
              <p className='count-message main-color bold'>{projectsCount !== 0 && projectsCount !== null ? `You Have now ${projectsCount} Projects to Invest!` : 'We dont have projects To invest rigth Now'}</p>
              {
                projectsCount !== 0 && projectsCount !== null && this.renderProjectsList()
              }
            </div>
          )
        }
      </Fragment>
    )
  }
}