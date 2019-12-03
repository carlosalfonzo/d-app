import React from 'react';
import './css/InvestToProjectPanel.css';
import DropDown from './DropDown';

export default class InvestToProjectPanel extends React.Component {
  state = {
    transferValue: false,
    error: null
  }
  calculatePayment = (stakeVal) => {
    const { project } = this.props;
    this.stakeVal = stakeVal;
    this.amount = Math.round((parseInt(project.projectValuation) * stakeVal) / 100);
    let transferVal = `${stakeVal}% of the company value, equals to ${this.amount} ether`;
    if (this.state.transferValue !== transferVal)
      this.setState({ transferValue: transferVal })
    if (this.state.error)
      this.setState({ error: null })
  }

  invest = () => {
    if (this.amount && this.stakeVal) {
      const { contract, address, projectIndex } = this.props;
      this.amount = this.amount * 10 ** 18;
      this.props.investInProject(contract, address, projectIndex, this.stakeVal, this.amount);
    }
    else {
      this.setState({ error: 'You need to select a stake percentaje to buy' });
    }
  }

  render() {
    const { project } = this.props;
    const { transferValue, error } = this.state;
    return (
      <div className='project-investment-panel-container full-width flex wrap third-background'>
        <DropDown maxVal={project.stakeToSell} onChange={this.calculatePayment} />
        {
          transferValue && (
            <p className='transfer-information five-color full-width'>{transferValue}</p>
          )
        }
        {
          error && (
            <p className='transfer-information five-color full-width'>{error}</p>
          )
        }
        <div className='transfer-button-container full-width flex'>
          <button onClick={this.invest} className='main-background third-color primary-button light'>TRANSFER</button>
        </div>
      </div>
    )
  }
}
