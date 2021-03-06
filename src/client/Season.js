import React from 'react';
import {browserHistory} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import NumberedAvatar from './NumberedAvatar';

class Season extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: { title: '', year: '', seasons: [] },
			season: { episodes: [] },
			watched: null
		};

		this.getShowInfo = this.getShowInfo.bind(this);
		this.getEpisodes = this.getEpisodes.bind(this);
		this.getWatchedEpisodes = this.getWatchedEpisodes.bind(this);
		this.handleEpisodeTouchTap = this.handleEpisodeTouchTap.bind(this);
		this.goToShow = this.goToShow.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
		this.getEpisodes();
	}

	componentDidUpdate(prevProps, prevState) {
		document.title = 'Season ' + this.props.params.season + ' - ' + this.state.show.title + ' - LocalStream';
		// check if the user's changed or if there's no watch array set
		if (this.props.user !== prevProps.user || !this.state.watched) {
			// if it has, we should update the watched episodes
			this.getWatchedEpisodes();
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

	getWatchedEpisodes() {
		// if logged in, fetch episodes this user has watched
		if (this.props.user) {
			// init the array (so that this function isn't called again before the fetch completes)
			this.state.watched = [];
			fetch('/user/tracking/' + this.props.user.name + '/' + this.props.params.id + '/' + this.props.params.season)
			.then(res => res.json())
			.then(res => this.setState({ watched: res }));
		} else {
			// otherwise, set watched back to an empty array
			this.setState({ watched: [] });
		}
	}

	handleEpisodeTouchTap(episode) {
		browserHistory.push('/stream/' + this.props.params.id + '/S' + this.props.params.season + '/' + episode);
	}

	goToShow() {
		browserHistory.push('/stream/' + this.props.params.id);
	}

	render() {
		return (
			<Card>
				<CardMedia
					overlay={
						<CardTitle
							title={this.state.show.title}
							subtitle={'First aired in ' + this.state.show.year}
						/>
					}
					onTouchTap={this.goToShow}
					style={{ cursor: 'pointer' }}
				>
					<img
						src={this.state.show.cover ? this.state.show.cover : '/static/cover-default.png'}
						style={{ borderRadius: '2px 2px 0 0', minHeight: '100px', background: 'white' }}
					/>
				</CardMedia>
				<CardText>
					<List>
						<Subheader>{this.state.season.title}</Subheader>
						{this.state.season.episodes.map(function(episode) {
							// if watched list is loaded, check it
							if (this.state.watched) {
								var watched = this.state.watched.find(item => item.num === episode.num);
								var watchedText = watched ? ' [Watched ' + parseInt(watched.percentage*100) + '%]' : '';
							}
							// create primary text element
							var primaryText = (
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<span>{episode.title}</span>
									{this.state.watched ? <span>{watchedText}</span> : ''}
								</div>
							)

							return (
								<ListItem
									key={episode.num}
									primaryText={primaryText}
									leftAvatar={NumberedAvatar(episode.num)}
									onTouchTap={() => this.handleEpisodeTouchTap(episode.num)}
								/>
							)
						}.bind(this))}
					</List>
				</CardText>
			</Card>
		)
	}
}

export default Season;
