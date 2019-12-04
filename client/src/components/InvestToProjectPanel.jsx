import React from 'react';
import './css/InvestToProjectPanel.css';
import DropDown from './DropDown';
import { toEther } from '../globals/utils';
import Loader from './Loader';

export default class InvestToProjectPanel extends React.Component {
  state = {
    transferValue: false,
    error: null
  }
  calculatePayment = (stakeVal) => {
    const { project } = this.props;
    this.stakeVal = stakeVal;
    this.amount = Math.round((parseInt(project.projectValuation) * stakeVal) / 100);
    let transferVal = `${stakeVal}% of the company value, equals to ${toEther(this.amount)} Eth`;
    if (this.state.transferValue !== transferVal)
      this.setState({ transferValue: transferVal })
    if (this.state.error)
      this.setState({ error: null })
  }
  invest = () => {
    if (this.amount && this.stakeVal) {
      const { contract, address, projectIndex } = this.props;
      this.props.investInProject(contract, address, projectIndex, this.stakeVal, this.amount);
    }
    else {
      this.setState({ error: 'You need to select a stake percentaje to buy' });
    }
  }
  render() {
    const { project, loading, error: txtError } = this.props;
    const { transferValue, error } = this.state;
    return (
      <div className='project-investment-panel-container full-width flex wrap third-background'>
        <DropDown maxVal={project.availableStake} onChange={this.calculatePayment} />
        {
          transferValue && (
            <p className='transfer-information five-color full-width'>{transferValue}</p>
          )
        }
        {
          (error || txtError) && (
            <p className='transfer-information five-color full-width'>{txtError ? txtError : error}</p>
          )
        }
        <div className='transfer-button-container full-width flex'>
          <button onClick={this.invest} className='main-background third-color primary-button light'>TRANSFER</button>
        </div>
        {
          loading && <Loader />
        }
      </div>
    )
  }
}
