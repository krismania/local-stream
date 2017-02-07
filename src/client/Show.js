import React from 'react';

class Show extends React.Component {

	constructor(props) {
		super(props);

		this.state = { show: { title: '', year: '' } };

		this.getShowInfo = this.getShowInfo.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
	}

	getShowInfo() {
		fetch('/api/shows/' + this.props.params.id)
		.then(res => res.json())
		.then(res => this.setState({ show: res }));
	}

	render() {
		return (
			<div>
				<h1>{this.state.show.title}</h1>
				<h3>{this.state.show.year}</h3>
				<p>{this.props.params.id}</p>
			</div>
		)
	}
}

export default Show;