import React from 'react';
import {browserHistory} from 'react-router';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Video from './Video';

class Player extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: { id: '', title: '', year: '', seasons: [] },
			season: { num: null, title: '', episodes: [] },
			episode: { num: null, title: '', src: null, next: null, prev: null },
			tracking: { percentage: 0 }
		}

		this.getShowInfo = this.getShowInfo.bind(this);
		this.getEpisodes = this.getEpisodes.bind(this);
		this.getEpisodeInfo = this.getEpisodeInfo.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
	}

	componentDidUpdate(prevProps, prevState) {
		document.title = 'Season ' + this.props.params.season + ', Episode ' + this.props.params.episode + ' - ' + this.state.show.title + ' - LocalStream';
		// check if show has changed
		if(this.state.show !== prevState.show) {
			// if it has, get the new show's episodes
			this.getEpisodes();
		}
		// check if the current episode matches the URL param
		if(parseInt(this.props.params.episode) !== this.state.episode.num) {
			// if it doesn't, we need to fetch the new ep info
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
		browserHistory.push('/stream/' + this.state.show.id + '/S' + this.props.params.season + '/' + this.state.episode.prev.num);
	}

	handleNext() {
		browserHistory.push('/stream/' + this.state.show.id + '/S' + this.props.params.season + '/' + this.state.episode.next.num);
	}

	handleTimeUpdate(event) {
		// floors percentage value to prevent excessive time updates
		// for a ~23:00 episode, this will change every ~00:14
		// it also means that for any episodes, the watched percentage will only
		// update 100 times.
		var percentage = parseInt(event.detail.percentage) / 100;
		if (percentage !== this.state.tracking.percentage) {
			this.state.tracking.percentage = percentage;
			console.log('watched update: ' + percentage);
			// send to the server
			var body = {
				show: this.state.show.id,
				season: this.state.season.num,
				episode: this.state.episode.num,
				percentage: percentage
			};

			fetch('/user/tracking/' + this.props.user.name, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			.then(res => console.log('response', res.ok));
		}
	}

	render() {
		var subString = 'Season ' + this.props.params.season + ' \u00B7 Episode ' + this.props.params.episode + ' \u00B7 ' + this.state.show.title;
		return (
			<div>
				<Video
					key={Math.random()}
					src={this.state.episode.src}
					onTimeUpdate={this.handleTimeUpdate}
				/>
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
