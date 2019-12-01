import React, { Suspense } from 'react';
import { allRoutes } from './routes';
import Root from '../containers/RootContainer';
import Loader from '../components/Loader';
import { Switch, Route } from 'react-router-dom';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Root>
        <Suspense fallback={<Loader siteLoader />}>
          <Switch>
            {
              allRoutes.map(singleRoute => {
                return <Route {...singleRoute} />;
              })
            }
          </Switch>
        </Suspense>
      </Root>
    );
  }
}
