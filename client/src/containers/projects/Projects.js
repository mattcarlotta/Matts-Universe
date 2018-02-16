import { map, isEmpty } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projectActionCreators';

import AdminPanel from '../app/AdminPanel';
import RenderProjects from '../../components/projects/renderProjects';
import Loading from '../app/Loading';

class Projects extends Component {
	componentDidMount = () => !this.props.projects && this.grabProjects();

	grabProjects = () => this.props.fetchProjects();

	render = () => {
		const { projects } = this.props;

		if (isEmpty(projects)) return <Loading items={projects} message={'No projects were found!'} />

		return (
			<Fragment>
				<AdminPanel updateProjectItems={this.grabProjects} projects={projects} />
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

export default connect(state => ({ projects: state.works.projects }), { fetchProjects })(Projects);
