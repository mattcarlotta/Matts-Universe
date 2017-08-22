import _ from 'lodash';
import React, { Component } from 'react';
import Slider from 'react-slick';

import { fetchProjects } from '../actions/ProjectActionCreators';
import { NextArrow, PrevArrow } from '../components/projects/SliderArrows';

import AdminPanel from '../containers/app/AdminPanel';
import NoItemsFound from '../components/app/NoItemsFound';
import RenderProjects from '../components/projects/RenderProjects';
import Spinner from '../components/loaders/Spinner';

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />
};

export default class Projects extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetchingProjects: false,
			requestTimeout: false
		};
	}

	componentDidMount() {
		this.fetchAllProjects();
		this.timeout = setTimeout(this.timer, 5000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	fetchAllProjects = () => {
		this.setState({ isFetchingProjects: true }, () => {
			fetchProjects().then(res => {
				this.setState({
					isFetchingProjects: false,
					projects: res.projects ? res.projects : '',
					projectCount: res.projectCount ? res.projectCount : '',
					serverError: res.err ? res.err : ''
				});
			});
		});
	};

	clearTimer = () => {
		clearTimeout(this.timeout);
	};

	timer = () => {
		this.clearTimer();
		this.setState({ requestTimeout: true });
	};

	render() {
		const {
			isFetchingProjects,
			projects,
			serverError,
			requestTimeout
		} = this.state;
		const projectContainer = 'project-container';

		if (_.isEmpty(projects) || isFetchingProjects) {
			if (serverError || requestTimeout)
				return (
					<NoItemsFound
						message={serverError ? serverError : 'No projects were found!'}
					/>
				);

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
