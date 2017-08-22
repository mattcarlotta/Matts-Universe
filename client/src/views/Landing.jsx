import React from 'react';
import { connect } from 'react-redux';

import { authError } from '../actions/AuthActionCreators';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import RenderAlert from '../components/app/RenderAlert';

const Landing = props => {
	return (
		<span>
			<Home />
			<About />
			<Projects />
			{props.serverError
				? <RenderAlert
						resetError={props.authError}
						errorMessage={props.serverError}
					/>
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
