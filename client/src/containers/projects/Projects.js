import { map, isEmpty } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projectActionCreators';

import AdminPanel from '../app/AdminPanel';
import NoItemsFound from '../../components/app/noItemsFound';
import RenderProjects from '../../components/projects/renderProjects';
import Spinner from '../../components/loaders/spinner';

class Projects extends Component {
	state = {
		isFetchingProjects: false,
		requestTimeout: false,
		projects: []
	};

	componentDidMount = () => {
		this.fetchAllProjects();
		this.setTimer();
	}

	componentWillUnmount = () => this.clearTimer();

	fetchAllProjects = () => {
		this.setState({ isFetchingProjects: true });
		this.props.fetchProjects()
		.then(({data: { projects, projectCount }}) => {
			this.setState({
				isFetchingProjects: false,
				projects: projects,
				projectCount: projectCount
			});
		})
		.catch(err => console.error(err))
	};

	setTimer = () => this.timeout = setTimeout(this.timer, 5000)

	clearTimer = () => clearTimeout(this.timeout)

	timer = () => {
		this.clearTimer();
		this.setState({ requestTimeout: true });
	};

	render = () => {
		const { isFetchingProjects, projects, requestTimeout } = this.state;

		if (isEmpty(projects) || isFetchingProjects) {
			if (requestTimeout)
				return <NoItemsFound message={'No projects were found!'} />;

			return <Spinner />;
		}

		this.clearTimer();

		return (
			<Fragment>
				<AdminPanel updateProjectItems={this.fetchAllProjects} projects={projects} />
				<Carousel>
					{map(projects, (project, key) => (
						<div key={key}>
							<RenderProjects {...project} />
						</div>
					))}
				</Carousel>
			</Fragment>
		);
	}
}

export default connect(null, { fetchProjects })(Projects);
