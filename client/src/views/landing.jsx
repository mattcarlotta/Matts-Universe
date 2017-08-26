import React from 'react';
import { connect } from 'react-redux';

import { authError } from '../actions/authActionCreators';
import Home from './home';
import About from './about';
import Projects from './Projects';
import RenderAlert from '../components/app/RenderAlert';

const Landing = ({ serverError, authError }) => {
	return (
		<span>
			<Home />
			<About />
			<Projects />
			{serverError
				? <RenderAlert resetError={authError} errorMessage={serverError} />
				: null}
		</span>
	);
};

export default connect(
	state => {
		return { serverError: state.auth.error };
	},
	{ authError }
)(Landing);
