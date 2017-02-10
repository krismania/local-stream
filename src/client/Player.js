import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'; 

const videoStyle = {
	display: 'block',
	width: '100%',
	backgroundColor: 'black',
	borderRadius: '2px'
}

class Player extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: { title: '', year: '', seasons: [] },
			season: { episodes: [] },
			episode: { title: 'Episode' }
		}

		this.getShowInfo = this.getShowInfo.bind(this);
		this.getEpisodes = this.getEpisodes.bind(this);
		this.getVidPath = this.getVidPath.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
		this.getEpisodes();
	}

	componentDidUpdate() {
		document.title = this.state.show.title + ': S' + this.props.params.season + ', E' + this.props.params.episode + ' - Local Stream';
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

	getVidPath() {
		return '/static/media/' + this.props.params.id + '/' + this.props.params.season + '/' + this.props.params.episode;
	}

	render() {
		var vidPath = this.getVidPath();
		var subString = 'Season ' + this.props.params.season + ' \u00B7 Episode ' + this.props.params.episode + ' \u00B7 ' + this.state.show.title;
		return (
			<div>
				<Paper zDepth={3} style={{ marginBottom: '15px' }}>
					<video controls style={videoStyle} src={vidPath + '.mp4'}>
						<track
							src={vidPath + '.vtt'}
							kind="subtitles"
							srcLang="en"
							label="English"
							default
						/>
					</video>
				</Paper>
				<Card>
					<CardTitle
						title = {this.state.episode.title}
						subtitle = {subString}
					/>
					<CardActions style={{ textAlign: 'right' }}>
						<FlatButton label="Previous Episode" />
						<FlatButton label="Next Episode" />
					</CardActions>
				</Card>
			</div>
		)
	}
}

export default Player;
