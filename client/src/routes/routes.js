import React from 'react';
import Error404 from '../components/Error404';
import HomeContainer from '../containers/HomeContainer';
import ProjectViewContainer from '../containers/ProjectViewContainer';
import NewProjectContainer from '../containers/NewProjectContainer';
import MyProjectsContainer from '../containers/MyProjectsContainer';

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
    exact: true,
    path: '/my-projects',
    component: MyProjectsContainer,
    key: 'MyProjectsContainer',
  },
  {
    component: Error404,
    key: 'Error404',
  }
];
