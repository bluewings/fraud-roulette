import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main, { uriPattern as main_path } from './main';
import About, { uriPattern as about_path } from './about';
import Layout from '../components/Layout';

const pages = [
  {
    name: 'Main',
    path: main_path,
    Component: Main,
  },
  {
    name: 'About',
    path: about_path,
    Component: About,
  },
];

const REDIRECT_URI = main_path;

const Routes = (() => {
  const routes = [
    ...pages.map(({ exact, path, Component }: any, i) => (
      <Route
        key={`route-${i}`}
        exact={!!exact}
        path={path}
        render={(routeProps: any) => <Component {...routeProps} />}
      />
    )),
    <Redirect key="redirect-to-default" to={REDIRECT_URI} />,
  ];
  return () => (
    <Layout>
      <Switch>{routes}</Switch>
    </Layout>
  );
})();

export default pages;

export { Routes };
