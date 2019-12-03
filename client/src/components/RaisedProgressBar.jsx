import React from 'react';
import './css/RaisedProgressBar.css';
import { getProgressBarPercentaje } from '../globals/utils';

export default class RaisedProgressBar extends React.Component {
  render() {
    const { valuation, criteria, balance } = this.props;
    return (
      <span className='founding-bar-container full-width'>
        <div className='progressbar-content main-background'
          style={{
            width: getProgressBarPercentaje(valuation, criteria, balance)
          }}
        />
      </span>
    )
  }
}
