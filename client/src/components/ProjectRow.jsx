
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toEther, getProjectGoal } from '../globals/utils';
import Loader from './Loader';
import check from '../assets/icons/check.png';
import pause from '../assets/icons/pause.png';
import investing from '../assets/icons/investing.png';
import RaisedProgressBar from './RaisedProgressBar';

export default class ProjectRow extends React.Component {
  status = {}
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
  getProjectStatus() {
    const { availableToInvest, availableStake } = this.props.project;
    console.log(!availableToInvest)
    if (!availableToInvest) {
      this.status.showUnpause = true;
      this.status.showPause = false;
      this.status.message = 'PROJECT PAUSED';
      this.status.image = pause;
    } else {
      if (parseInt(availableStake)) {
        this.status.showUnpause = false;
        this.status.showPause = true;
        this.status.message = 'AVAILABLE';
        this.status.image = investing;
      } else {
        this.status.showUnpause = false;
        this.status.showPause = true;
        this.status.message = 'GOAL REACHED';
        this.status.image = check;
      }
    }
    return (
      <div className='project-status-container flex-center'>
        <img className='status-image' src={this.status.image} alt='project-status-image' />
        <p className='status-label five-color light'>{this.status.message}</p>
      </div>
    )
  }
  pause = () => {
    const {
      contract,
      address,
      stopProject,
      projectIndex
    } = this.props;
    return stopProject(contract, address, projectIndex);
  }
  render() {
    const { loading, project, projectIndex } = this.props;
    return (
      <div className='project-row-container full-width third-background flex-between'>
        {
          loading ? <Loader /> : (
            <Fragment>
              <Link to={`/project/${projectIndex}`} className='project-imge-container five-background flex'>
                <img src={project.headerHash} alt="project" className='full-width' />
              </Link>
              <div className='project-title-container flex-center wrap'>
                <p className='title main-color full-width'>{project.name}</p>
                <span className='attribute-container stake flex-center full-width'>
                  <p className='label criteria five-color full-width'>Finish Criteria:</p>
                  <p className='value main-color full-width overflow-ellipsis'>{`${project.finishCriteria}%`}</p>
                </span>

              </div>
              {this.getProjectStatus()}
              <div className='goal-container flex-center wrap'>
                <span className='attribute-container stake flex full-width'>
                  <p className='label five-color light'>Goal:</p>
                  <p className='value main-color'>{getProjectGoal(project.projectValuation, project.stakeToSell)}</p>
                </span>
                <span className='attribute-container stake flex full-width'>
                  <p className='label five-color light'>Raised:</p>
                  <p className='value main-color'>{`${toEther(project.projectBalance)} Eth`}</p>
                </span>
              </div>
              <RaisedProgressBar
                className='row-progressbar'
                valuation={project.projectValuation}
                criteria={project.finishCriteria}
                balance={project.projectBalance}
                stake={project.stakeToSell}
              />
              {
                this.status.showPause && <p onClick={this.pause} className='stop-stake-action five-color light'>STOP STAKE</p>
              }
            </Fragment>
          )
        }
      </div>
    );
  }
}