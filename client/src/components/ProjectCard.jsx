
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toEther } from '../globals/utils';
import Loader from './Loader';

export default class ProjectCard extends React.Component {
  componentDidMount() {
    const { contract,
      address,
      project,
      projectIndex,
      getProject } = this.props;
    if (!project) {
      getProject(contract, address, projectIndex);
    }
  }
  render() {
    const { loading, project, projectIndex } = this.props;
    return (
      <div className='project-card flex wrap'>
        {
          loading ? <Loader /> : (
            <Fragment>
              <Link to={`/project/${projectIndex}`} className='project-image-container five-background full-width flex'>
                <img src={project.headerHash} alt="project" className='full-width' />
              </Link>
              <div className='project-message-container full-width flex wrap third-background'>
                <p className='title main-color bold full-width'>{project.name}</p>
                <p className='five-color full-width overflow-ellipsis'>{project.description}</p>
                <span className='attribute-container full-width flex'>
                  <p className='label five-color bold'>Company Value:</p>
                  <p className='main-color'>{toEther(project.projectValuation) + ' Eth'}</p>
                </span>
                <span className='attribute-container stake flex'>
                  <p className='label five-color bold'>Stake To Sell:</p>
                  <p className='stake-to-sell main-color'>{`${project.stakeToSell}%`}</p>
                </span>
                <Link to={`/project/${projectIndex}`} className='see-more main-color'>
                  See More
                </Link>
              </div>
            </Fragment>
          )
        }
      </div>
    );
  }
}