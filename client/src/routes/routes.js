import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components';
import BlogPosts from '../containers/blog/BlogPosts';
import BlogForm from '../containers/blog/BlogForm';
import DashWrapper from '../containers/app/DashWrapper';
import Landing from '../views/landing';
import NotFound from '../components/notfound/notFound';
import ProjectForm from '../containers/projects/ProjectForm';
import RequireAuth from '../containers/auth/RequireAuth';
import ShowBlog from '../views/showBlog';
import SignIn from '../containers/auth/SignIn';
// import SignUp from '../containers/auth/SignUp';

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
		{/* <Route path="/signup" component={SignUp} /> */}
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
