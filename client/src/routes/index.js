import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components';
import DashWrapper from '../containers/App/DashWrapper/DashWrapper';
import Landing from '../components/Landing/landing';
import NotFound from '../components/Navigation/NotFound/notFound';
import ProjectForm from '../containers/Projects/ProjectForm/ProjectForm';
import RequireAuth from '../containers/Auth/RequireAuth/RequireAuth';
import SignIn from '../containers/Auth/SignIn/SignIn';
import SignUp from '../containers/Auth/SignUp/SignUp';

const routes = (
  <Route path="/" component={DashWrapper(App)}>
    <IndexRoute component={Landing} />
    <Route path="/projects/new" component={RequireAuth(ProjectForm)} />
    <Route path="/projects/edit/:id" component={RequireAuth(ProjectForm)} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
