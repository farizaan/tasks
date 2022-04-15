import Button from "@mui/material/Button";
import React from "react";

export class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { counter: 60 };
	}

	// countDown = () =>
	interval = null;
	countDown = () => {
		clearInterval(this.interval);
		let i = this.state.counter;
		this.interval = setInterval(() => {
			console.log(this.state.counter);

			this.setState({ counter: --i });

			if (i <= 0) clearInterval(this.interval);
		}, 1000);
	};
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		return (
			<div>
				<Button onClick={this.countDown}>Count Down</Button>
				{this.state.counter}
			</div>
		);
	}
}
