import React from 'react';
import { Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../components';
import Landing from '../views/landing';
import NavBar from '../components/navigation/NavBar';
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
		<Route path="/blog/:id" component={NavBar(ShowBlog)} />
		<Route
			path="/blog/post/new"
			component={RequireAuth(NavBar(ShowBlogForm))}
		/>
		<Route path="/blog/post/:id" component={NavBar(ShowBlogPost)} />
		<Route
			path="/blog/edit/:id"
			component={RequireAuth(NavBar(ShowBlogForm))}
		/>
		<Route
			path="/projects/new"
			component={RequireAuth(NavBar(ShowProjectForm))}
		/>
		<Route
			path="/projects/edit/:id"
			component={RequireAuth(NavBar(ShowProjectForm))}
		/>
		<Route path="/signin" component={NavBar(SignIn)} />
		<Route path="/signup" component={NavBar(SignUp)} />
		<Route path="*" component={NavBar(NotFound)} />
	</Route>
);

export default routes;
