import React from 'react';
import Error404 from '../components/Error404';
import HomeContainer from '../containers/HomeContainer';
import ProjectViewContainer from '../containers/ProjectViewContainer';
import NewProjectContainer from '../containers/NewProjectContainer';

export const allRoutes = [
  {
    exact: true,
    path: '/',
    component: HomeContainer,
    key: 'HomeContainer',
  },
  {
    exact: true,
    path: '/project/:id',
    component: ProjectViewContainer,
    key: 'ProjectViewContainer',
  },
  {
    exact: true,
    path: '/new-project',
    component: NewProjectContainer,
    key: 'NewProjectContainer',
  },
  {
    component: Error404,
    key: 'Error404',
  }
];
