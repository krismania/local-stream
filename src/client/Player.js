import React from 'react';

const videoStyle = {
	width: '100%',
	backgroundColor: 'black'
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
		return (
			<div>
				<video style={videoStyle} src={vidPath + '.mp4'}>
					<track
						src={vidPath + '.vtt'}
						kind="subtitles"
						srcLang="en"
						label="English"
						default
					/>
				</video>
				<h1>{this.state.episode.title}</h1>
				<h3>{'Season ' + this.props.params.season + ' \u00B7 Episode ' + this.props.params.episode + ' \u00B7 ' + this.state.show.title}</h3>
			</div>
		)
	}
}

export default Player;