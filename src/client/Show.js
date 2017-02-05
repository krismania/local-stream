import React from 'react';

class Show extends React.Component {

	constructor(props) {
		super(props);

		this.state = { show: { title: '', year: '' } };

		this.getShowInfo = this.getShowInfo.bind(this);
	}

	componentDidMount() {
		this.setState({show: this.getShowInfo()});
	}

	getShowInfo() {
		return {
			title: 'Test Show',
			year: '2013'
		}
	}

	render() {
		return (
			<div>
				<h1>{this.state.show.title}</h1>
				<h3>{this.state.show.year}</h3>
				<p>{this.props.params.name}</p>
			</div>
		)
	}
}

export default Show;