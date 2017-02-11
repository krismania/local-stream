import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Video from './Video';

class Player extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: { title: '', year: '', seasons: [] },
			season: { episodes: [] },
			episode: { num: null, title: '', src: null, next: null, prev: null }
		}

		this.getShowInfo = this.getShowInfo.bind(this);
		this.getEpisodes = this.getEpisodes.bind(this);
		this.getEpisodeInfo = this.getEpisodeInfo.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
		this.getEpisodes();
	}

	componentDidUpdate() {
		document.title = this.state.show.title + ': S' + this.props.params.season + ', E' + this.props.params.episode + ' - Local Stream';
		if (!this.state.episode.num) {
			this.getEpisodeInfo();
		}
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

	getEpisodeInfo() {
		// ep info is derived from this.state.season
		var epNum = parseInt(this.props.params.episode);
		var ep = this.state.season.episodes.find(episode => episode.num === epNum);
		if (ep) {
			ep.prev = this.state.season.episodes.find(episode => episode.num === epNum - 1) || null;
			ep.next = this.state.season.episodes.find(episode => episode.num === epNum + 1) || null;
			ep.src = '/static/media/' + this.props.params.id + '/' + this.props.params.season + '/' + this.props.params.episode;
			this.setState({ episode: ep });
		}
	}

	handlePrev() {
		window.location = '/stream/' + this.state.show.id + '/S' + this.props.params.season + '/' + this.state.episode.prev.num;
	}

	handleNext() {
		window.location = '/stream/' + this.state.show.id + '/S' + this.props.params.season + '/' + this.state.episode.next.num;
	}

	render() {
		var subString = 'Season ' + this.props.params.season + ' \u00B7 Episode ' + this.props.params.episode + ' \u00B7 ' + this.state.show.title;
		return (
			<div>
				<Video src={this.state.episode.src} />
				<Card>
					<CardTitle
						title = {this.state.episode.title}
						subtitle = {subString}
					/>
					<CardActions style={{ textAlign: 'right' }}>
						<FlatButton
							label="Previous Episode"
							disabled={this.state.episode.prev === null}
							onTouchTap={this.handlePrev}
						/>
						<FlatButton
							label="Next Episode"
							disabled={this.state.episode.next === null}
							onTouchTap={this.handleNext}
						/>
					</CardActions>
				</Card>
			</div>
		)
	}
}

export default Player;