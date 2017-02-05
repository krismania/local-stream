import React from 'react';
import Paper from 'material-ui/Paper';

import ShowList from './ShowList';

class Stream extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ShowList/>
			</div>
		)
	}
}

export default Stream;