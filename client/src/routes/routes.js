import React, { Fragment, lazy } from 'react';
// const Error404 = lazy(() => import('../components/Error404'));
const Home = lazy(() => import('../components/Home'));

export const allRoutes = [
  {
    exact: true,
    path: '/',
    component: Home,
    key: 'Home',
  }
];
