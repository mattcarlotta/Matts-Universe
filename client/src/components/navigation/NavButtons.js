import { debounce } from 'lodash';
import React, { Component } from 'react';
import { animateScroll as Nav } from 'react-scroll';
import { CSSTransitionGroup } from 'react-transition-group';

import Header from './header';

class ScrollButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollY: window.scrollY,
			fixedNavBar: false
		};
		this.handleScroll = debounce(this.handleScroll, 200);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		this.setState({
			scrollY: window.scrollY,
			fixedNavBar: window.scrollY >= 30 ? true : false
		});
	};

	showScrollButton(scrollY) {
		return scrollY >= 1200 ? (
			<div
				key="scrolltotop"
				onClick={() =>
					Nav.scrollTo(0, { duration: 1000, smooth: 'easeInOutQuint' })}
				className="scroll"
			>
				<span className="icon">
					<i className="fa fa-angle-double-up" aria-hidden="true" />
				</span>
				<span className="text">Top</span>
			</div>
		) : (
			<div
				key="scrolltobottom"
				onClick={() =>
					Nav.scrollToBottom({
						duration: 1000,
						smooth: 'easeInOutQuint'
					})}
				className="scroll"
			>
				<span className="text">Bottom</span>
				<span className="icon">
					<i className="fa fa-angle-double-down" aria-hidden="true" />
				</span>
			</div>
		);
	}

	render() {
		const { scrollY, fixedNavBar } = this.state;

		return (
			<span>
				<Header fixedNavBar={fixedNavBar} />
				<CSSTransitionGroup
					transitionName="scrolltransition"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={100}
				>
					{this.showScrollButton(scrollY)}
				</CSSTransitionGroup>
			</span>
		);
	}
}

export default ScrollButton;
