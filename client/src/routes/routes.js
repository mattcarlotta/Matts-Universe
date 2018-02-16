import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components';
import DashWrapper from '../containers/app/DashWrapper';
import Landing from '../views/landing';
import NotFound from '../components/notfound/notFound';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
import RequireAuth from '../containers/auth/RequireAuth';
import ShowBlog from '../views/showBlog';
import ShowBlogForm from '../containers/blog/ShowBlogForm';
import ShowBlogPost from '../components/blog/ShowBlogPost';
import ShowProjectForm from '../containers/projects/ShowProjectForm';
import SignIn from '../containers/auth/SignIn';
// import SignUp from '../containers/auth/SignUp';

const routes = (
	<Route path="/" component={DashWrapper(App)}>
		<IndexRoute component={Landing} />
		<Route path="/blog/:id" component={ShowBlog} />
		<Route path="/blog/post/new" component={RequireAuth(ShowBlogForm)} />
		<Route path="/blog/post/:id" component={ShowBlogPost} />
		<Route path="/blog/edit/:id" component={RequireAuth(ShowBlogForm)} />
		<Route path="/projects/new" component={RequireAuth(ShowProjectForm)} />
		<Route path="/projects/edit/:id" component={RequireAuth(ShowProjectForm)} />
		<Route path="/signin" component={SignIn} />
		{/* <Route path="/signup" component={SignUp} /> */}
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
