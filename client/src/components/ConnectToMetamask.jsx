import React from 'react';
import './css/ConnectToMetamask.css';
import trustMe from '../assets/img/TrustMe.png';
import metamask from '../assets/img/metamask.jpg';
import Loader from './Loader';

export default class ConnectToMetamask extends React.Component {
  render() {
    return (
      <div className='connect-to-metamask-wrapper max-width flex full-width wrap'>
        <div className='logo-container full-width flex-center'>
          <img className='trustme-logo' src={trustMe} alt='trustme' />
        </div>
        <span className='message-container flex-center full-width wrap'>
          <p className='five-color light'>Before using</p>
          <p className='main-color bold'>TrustMe</p>
          <p className='five-color light'>you need to connect with Metamask</p>
        </span>
        <div className='metamask-logo-container full-width flex-center'>
          <img className='metamask-logo' src={metamask} alt='metamask' />
        </div>
        <Loader />
      </div>
    )
  }
}
