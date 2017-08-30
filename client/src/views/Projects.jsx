import _ from 'lodash';
import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/projectActionCreators';
import { NextArrow, PrevArrow } from '../components/projects/sliderArrows';

import AdminPanel from '../containers/app/AdminPanel';
import NoItemsFound from '../components/app/noItemsFound';
import RenderProjects from '../components/projects/renderProjects';
import Spinner from '../components/loaders/spinner';

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />
};

class Projects extends Component {
	state = {
		isFetchingProjects: false,
		requestTimeout: false
	};

	componentDidMount() {
		this.fetchAllProjects();
		this.timeout = setTimeout(this.timer, 5000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	fetchAllProjects = async () => {
		try {
			this.setState({ isFetchingProjects: true });

			const {
				data: { projects, projectCount }
			} = await this.props.fetchProjects();

			this.setState({
				isFetchingProjects: false,
				projects: projects,
				projectCount: projectCount
			});
		} catch (e) {
			console.warn(e);
		}
	};

	clearTimer = () => {
		clearTimeout(this.timeout);
	};

	timer = () => {
		this.clearTimer();
		this.setState({ requestTimeout: true });
	};

	render() {
		const { isFetchingProjects, projects, requestTimeout } = this.state;
		const projectContainer = 'project-container';

		if (_.isEmpty(projects) || isFetchingProjects) {
			if (requestTimeout)
				return <NoItemsFound message={'No projects were found!'} />;

			return <Spinner container={projectContainer} />;
		}

		this.clearTimer();

		return (
			<div className={projectContainer}>
				<h1>What I've developed.</h1>
				<div className="project-content">
					<AdminPanel
						updateProjectItems={this.fetchAllProjects}
						projects={projects}
					/>
					<Slider {...settings}>
						{projects.slice(0).map(project => {
							return (
								<div key={project._id}>
									<RenderProjects {...project} />
								</div>
							);
						})}
					</Slider>
				</div>
			</div>
		);
	}
}

export default connect(null, { fetchProjects })(Projects);
