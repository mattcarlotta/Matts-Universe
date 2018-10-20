import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components';
import BlogPosts from '../containers/Blog/BlogPosts/BlogPosts';
import BlogForm from '../containers/Blog/BlogForm/BlogForm';
import DashWrapper from '../containers/App/DashWrapper/DashWrapper';
import Landing from '../components/Landing/landing';
import NotFound from '../components/Navigation/NotFound/notFound';
import ProjectForm from '../containers/Projects/ProjectForm/ProjectForm';
import RequireAuth from '../containers/Auth/RequireAuth/RequireAuth';
import ShowBlog from '../components/Blog/ShowBlog/showBlog';
import SignIn from '../containers/Auth/SignIn/SignIn';
import SignUp from '../containers/Auth/SignUp/SignUp';

const routes = (
  <Route path="/" component={DashWrapper(App)}>
    <IndexRoute component={Landing} />
    <Route path="/blog/:id" component={ShowBlog} />
    <Route path="/blog/post/new" component={RequireAuth(BlogForm)} />
    <Route path="/blog/post/:id" component={BlogPosts} />
    <Route path="/blog/edit/:id" component={RequireAuth(BlogForm)} />
    <Route path="/projects/new" component={RequireAuth(ProjectForm)} />
    <Route path="/projects/edit/:id" component={RequireAuth(ProjectForm)} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
