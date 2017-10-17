import React, { PureComponent } from 'react';

class RenderAlert extends PureComponent {
	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.clearTimer();
			this.props.resetNotifications();
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
		this.props.resetNotifications();
	};

	renderSuccess(successMessage) {
		if (successMessage) {
			return (
				<div className="callout success">
					<div className="title">
						<i className="fa fa-bell-o" aria-hidden="true" />
						Success!
					</div>
					<div className="message">
						{successMessage}
					</div>
					<a className="close-notification" onClick={this.resetNotification}>
						<span>
							<i className="fa fa-times" aria-hidden="true" />
						</span>
					</a>
				</div>
			);
		}
	}

	renderError(errorMessage) {
		if (errorMessage) {
			return (
				<div className="callout error">
					<div className="title">
						<i className="fa fa-exclamation-triangle" aria-hidden="true" />
						Error!
					</div>
					<div className="message">
						{errorMessage}
					</div>
					<a className="close-notification" onClick={this.resetNotification}>
						<span>
							<i className="fa fa-times" aria-hidden="true" />
						</span>
					</a>
				</div>
			);
		}
	}

	render() {
		const { errorMessage, successMessage } = this.props;

		return (
			<span>
				{this.renderError(errorMessage)}
				{this.renderSuccess(successMessage)}
			</span>
		);
	}
}

export default RenderAlert;
