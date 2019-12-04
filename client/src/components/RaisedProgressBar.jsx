import React from 'react';
import './css/RaisedProgressBar.css';
import { getProgressBarPercentaje } from '../globals/utils';

export default class RaisedProgressBar extends React.Component {
  render() {
    const { valuation, criteria, balance, stake, className = '' } = this.props;
    return (
      <span className={`founding-bar-container full-width ${className}`}>
        <div style={{
          width: getProgressBarPercentaje(valuation, criteria, balance, stake)
        }}
          className='progressbar-content main-background'
        />
      </span>
    )
  }
}
