import React from 'react';
import trustMe from '../assets/img/TrustMe.png';
import { Link } from 'react-router-dom';
import './css/Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <div className='header-container full-width flex-between wrap max-width'>
        <Link to='/' className='header-logo-container flex'>
          <img src={trustMe} alt="trustme logo" />
        </Link>
        <div className='links-container flex'>
          <Link to='/new-project'>
            <p className='bold five-color'>NEW PROJECT</p>
          </Link>
          <Link to='/my-projects'>
            <p className='bold five-color'>MY PROJECTS</p>
          </Link>
        </div>
      </div>
    )
  }
}
