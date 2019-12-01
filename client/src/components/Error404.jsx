import React from 'react';
import { Link } from 'react-router-dom';
import './css/Error404.css';
import trustMe from '../assets/img/TrustMeError.png';

export default class Error404 extends React.Component {
  render() {
    return (
      <div className='not-found-wrapper full-width max-width flex wrap'>
        <p className='we-sorry main-color light full-width'>We Sorry...</p>
        <Link to='/' className='logo-container flex full-width'>
          <img className='trustme-logo' src={trustMe} />
        </Link>
        <p className='message-404 five-color bold full-width'>404 Content Not Found</p>
      </div>
    )
  }
}
