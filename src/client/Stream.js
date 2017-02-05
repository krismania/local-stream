import React from 'react';
import Paper from 'material-ui/Paper';

import ShowList from './ShowList';

class Stream extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentShow: null
		}

		this.handleSelectShow = this.handleSelectShow.bind(this);
	}

	handleSelectShow(name) {
		this.setState({ currentShow: name });
	}

	render() {
		return (
			<div>
				<ShowList onSelectShow={this.handleSelectShow} />
				<Paper
					style={{
						width: '100%',
						height: '100%'
					}}
					zDepth={3}
				>
					idk
				</Paper>
			</div>
		)
	}
}

export default Stream;