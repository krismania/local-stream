import React from 'react';

class Player extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: { title: '', year: '', seasons: [] },
			season: { episodes: [] },
			episode: { number: null, title: '' }
		}
	}

	render() {
		return (
			<video>
			</video>
		)
	}
}

export default Player;