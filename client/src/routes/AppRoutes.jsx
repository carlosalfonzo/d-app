import React from 'react';
import { allRoutes } from './routes';
import Root from '../containers/RootContainer';
import { Switch, Route } from 'react-router-dom';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Root>
        <Switch>
          {
            allRoutes.map(singleRoute => {
              return <Route {...singleRoute} />;
            })
          }
        </Switch>
      </Root>
    );
  }
}
