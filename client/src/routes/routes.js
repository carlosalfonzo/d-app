import React, { Fragment, lazy } from 'react';
const Error404 = lazy(() => import('../components/Error404'));
const Home = lazy(() => import('../containers/HomeContainer'));

export const allRoutes = [
  {
    exact: true,
    path: '/',
    component: Home,
    key: 'Home',
  },
  {
    component: Error404,
    key: 'Error404',
  }
];
