
import React from 'react';
import './css/Loader.css';

class Loader extends React.Component {
  render() {
    let { siteLoader, className = '' } = this.props;
    if (siteLoader) {
      return (
        <div className="master-loader-container app-placeholder-wrapper enter-animation secondary-background" id="site-placeholder">
          <div className="app-placeholder">
            <div className='loader-container'>
              <div className="dots-loader"><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={`master-loader-container simple-loader-container ${className}`}>
        <div className='simple-loader'>
          <div className="dots-loader"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    );
  }
}

export default Loader;