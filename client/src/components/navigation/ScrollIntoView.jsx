import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';
import { CSSTransitionGroup } from 'react-transition-group';

export default WrappedComponent => {
	class WindowScroll extends Component {
		constructor(props) {
			super(props);
			this.state = {
				scrollY: window.scrollY
			};
			this.handleScroll = debounce(this.handleScroll, 300);
		}

		componentDidMount() {
			window.addEventListener('scroll', this.handleScroll);
		}

		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location)
				this.component.scrollIntoView();
		}

		componentWillUnmount() {
			window.removeEventListener('scroll', this.handleScroll);
		}

		handleScroll = () => {
			this.setState({ scrollY: window.scrollY });
		};

		showScrollButton(scrollY) {
			return scrollY >= 1200
				? <div
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
				: <div
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
					</div>;
		}

		render() {
			return (
				<span ref={component => (this.component = component)}>
					<WrappedComponent {...this.props} />
					<CSSTransitionGroup
						transitionName="scrolltransition"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={100}
					>
						{this.showScrollButton(this.state.scrollY)}
					</CSSTransitionGroup>
				</span>
			);
		}
	}

	return withRouter(WindowScroll);
};
