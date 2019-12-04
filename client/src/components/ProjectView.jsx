
import React, { Fragment } from 'react';
import './css/ProjectView.css';
import Loader from './Loader';
import InvestToProjectPanel from '../containers/InvestToProjectPanelContainer';
import RaisedProgressBar from './RaisedProgressBar';
import { getProjectGoal, changeDocumentTitle, toEther } from '../globals/utils';

export default class ProjectView extends React.Component {
  state = {
    showInvestment: false,
    successTxt: null
  }

  componentDidMount() {
    const { contract,
      address,
      project,
      match: { params: { id } },
      getProject
    } = this.props;
    if (!project) {
      return getProject(contract, address, id);
    }
    this.setPageTitle();
  }

  checkIsNotOwner() {
    const { project, address } = this.props;
    return project.owner.toLowerCase() !== address.toLowerCase();
  }

  setPageTitle() {
    const { project: { name } } = this.props;
    changeDocumentTitle(name);
  }

  componentDidUpdate({ project, success }) {
    if (!success && this.props.success) {
      this.setState({ successTxt: 'You successfully withdraw the project Balance' });
    }
    if (!project && this.props.project) {
      this.setPageTitle();
    }
  }

  componentWillUnmount() {
    this.props.clearReducer();
  }

  withdrawBalance = () => {
    const { match: { params: { id } }, contract,
      address } = this.props;
    return this.props.withDraw(contract, address, id);
  }

  renderGallery() {
    return (
      <div className='project-gallery-container flex-between wrap'>
        <div className='gallery-image-container flex'>
          <img src="https://picsum.photos/id/667/400/300" alt="foo" />
        </div>
        <div className='gallery-image-container flex'>
          <img src="https://picsum.photos/id/667/400/300" alt="foo" />
        </div>
        <div className='gallery-image-container flex'>
          <img src="https://picsum.photos/id/667/400/300" alt="foo" />
        </div>
        <div className='gallery-image-container flex'>
          <img src="https://picsum.photos/id/667/400/300" alt="foo" />
        </div>
      </div>
    )
  }

  showInvestmentPanel = () => {
    this.setState({ showInvestment: !this.state.showInvestment });
  }

  showProjectStakeInformation() {
    const {
      match: { params: { id } },
      project,
      error,
      loadingTxt
    } = this.props;
    const { showInvestment, successTxt } = this.state;
    return (
      <div className='project-view-right-column-container flex wrap'>
        <div className='project-view-right-column flex wrap third-background'>
          <span className='goal-section full-width flex'>
            <span className='goal flex'>
              <p className='label light five-color'>Goal:</p>
              <p className='val main-color bold'>{getProjectGoal(project.projectValuation, project.stakeToSell)}</p>
            </span>
            <p className='rest-info five-color light'>{`${project.stakeToSell}% / company value`}</p>
          </span>
          <RaisedProgressBar
            valuation={project.projectValuation}
            criteria={project.finishCriteria}
            balance={project.projectBalance}
            stake={project.stakeToSell}
          />
          <span className='full-width flex raised'>
            <p className='main-color light'>Raised:</p>
            <p className='total-raised five-color light'>{toEther(project.projectBalance) + 'Eth'}</p>
          </span>
          <p className='info-title main-color full-width'>INFORMATION</p>
          <span className='company-info-container flex full-width'>
            <p className='label five-color light'>Company Value:</p>
            <p className='main-color'>{toEther(project.projectValuation) + ' Eth'}</p>
          </span>
          <span className='company-info-container flex full-width'>
            <p className='label five-color light'>Stake To Sell:</p>
            <p className='main-color'>{`${project.stakeToSell}%`}</p>
          </span>
          <span className='company-info-container flex full-width'>
            <p className='label five-color light'>Available Stake:</p>
            <p className='main-color'>{`${project.availableStake}%`}</p>
          </span>
          <span className='company-info-container flex full-width'>
            <p className='label five-color light'>Finish Criteria:</p>
            <p className='main-color'>{`${project.finishCriteria}%`}</p>
          </span>
          {
            this.checkIsNotOwner() && (
              <div className='button-container full-width flex'>
                <button onClick={this.showInvestmentPanel} className='main-background third-color primary-button light'>INVEST</button>
              </div>
            )
          }
          {
            !this.checkIsNotOwner() && parseInt(project.projectBalance) > 0 && (
              <div className='button-container full-width flex'>
                <button onClick={this.withdrawBalance} className='main-background third-color primary-button light'>WITHDRAW</button>
              </div>
            )
          }
          {
            loadingTxt && <Loader />
          }
          {
            successTxt && <p className='full-width main-color light'>{successTxt}</p>
          }
          {
            error && <p className='full-width five-color light'>{error}</p>
          }
        </div>
        {
          showInvestment && <InvestToProjectPanel projectIndex={id} />
        }
      </div>
    )
  }

  renderProjectView() {
    const { project } = this.props;
    return (
      <div className='project-view-wrapper flex-between wrap'>
        <div className='project-view-left-column flex wrap'>
          <div className='header-image five-background full-width flex'>
            <img src={project.headerHash} alt="project" className='full-width' />
          </div>
          <div className='project-content-container full-width flex-between wrap third-background'>
            <div className='project-information-content'>
              <p className='title main-color bold full-width'>{project.name}</p>
              <p className='description five-color full-width overflow-ellipsis'>{project.description}</p>
            </div>
          </div>
        </div>
        {this.showProjectStakeInformation()}
      </div>
    )
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <Loader />;
    }
    return this.renderProjectView();
  }
}