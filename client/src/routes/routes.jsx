import React from 'react';
import { Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../components';
import Landing from '../views/landing';
import NotFound from '../components/notfound/notFound';
import OnLoadAuth from '../containers/app/OnLoadAuth';
import RequireAuth from '../containers/auth/RequireAuth';
import ScrollIntoView from '../components/navigation/ScrollIntoView';
import ShowBlog from '../views/showBlog';
import ShowBlogForm from '../containers/blog/ShowBlogForm';
import ShowBlogPost from '../components/blog/ShowBlogPost';
import ShowProjectForm from '../containers/projects/ShowProjectForm';
import SignIn from '../containers/auth/SignIn';
import SignUp from '../containers/auth/SignUp';

injectTapEventPlugin();

const routes = (
	<Route path="/" component={OnLoadAuth(ScrollIntoView(App))}>
		<IndexRoute component={Landing} />
		<Route path="/blog/:id" component={ShowBlog} />
		<Route path="/blog/post/new" component={RequireAuth(ShowBlogForm)} />
		<Route path="/blog/post/:id" component={ShowBlogPost} />
		<Route path="/blog/edit/:id" component={RequireAuth(ShowBlogForm)} />
		<Route path="/projects/new" component={RequireAuth(ShowProjectForm)} />
		<Route path="/projects/edit/:id" component={RequireAuth(ShowProjectForm)} />
		<Route path="/signin" component={SignIn} />
		<Route path="/signup" component={SignUp} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
