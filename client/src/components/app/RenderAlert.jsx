import React, { Component } from 'react';

class RenderAlert extends Component {
	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.clearTimer();
			this.props.resetError('');
		}, 5000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	clearTimer = () => {
		clearTimeout(this.timeout);
	};

	resetNotification = () => {
		this.clearTimer();
		this.props.resetError('');
	};

	render() {
		const { errorMessage } = this.props;

		return (
			<span>
				{errorMessage
					? <div className="callout-alert">
							<div className="title">
								<i
									className="fa fa-exclamation-triangle"
									aria-hidden="true"
								/>{' '}
								Error!
							</div>
							<div className="error-message">
								{errorMessage}
							</div>
							<a
								className="close-notification"
								onClick={this.resetNotification}>
								<span>
									<i className="fa fa-times" aria-hidden="true" />
								</span>
							</a>
						</div>
					: null}
			</span>
		);
	}
}

export default RenderAlert;
