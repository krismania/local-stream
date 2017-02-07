import React from 'react';
import {List, ListItem} from 'material-ui/List';

class Show extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: { title: '', year: '', seasons: [] },
			season: { episodes: [] }
		};

		this.getShowInfo = this.getShowInfo.bind(this);
		this.getEpisodes = this.getEpisodes.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
		this.getEpisodes();
	}

	getShowInfo() {
		fetch('/api/shows/' + this.props.params.id)
		.then(res => res.json())
		.then(res => this.setState({ show: res }));
	}

	getEpisodes() {
		fetch('/api/shows/' + this.props.params.id + '/S' + this.props.params.season)
		.then(res => res.json())
		.then(res => this.setState({ season: res }));
	}

	render() {
		return (
			<div>
				<h1>{this.state.show.title}</h1>
				<h3>{'Season ' + this.props.params.season}</h3>
				<List>
					{this.state.season.episodes.map(function(episode) {
						return (
							<ListItem
								key={episode}
								primaryText={'Episode ' + episode}
								onTouchTap={() => this.handleEpisodeTouchTap(episode)}
							/>
						)
					}.bind(this))}
				</List>
			</div>
		)
	}
}

export default Show;