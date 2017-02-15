import React from 'react';
import Paper from 'material-ui/Paper';

import ShowList from './ShowList';

class Stream extends React.Component {

	constructor(props) {
		super(props);

		this.state = { shows: [] }
	}

	componentDidMount() {
		fetch('/api/shows')
		.then(res => res.json())
		.then(res => this.setState({ shows: res }));
	}

	render() {
		return (
			<div>
				<ShowList shows={this.state.shows} />
			</div>
		)
	}
}

export default Stream;
