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
			season: { episodes: [] }
		};

		this.getShowInfo = this.getShowInfo.bind(this);
		this.getEpisodes = this.getEpisodes.bind(this);
		this.handleEpisodeTouchTap = this.handleEpisodeTouchTap.bind(this);
		this.goToShow = this.goToShow.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
		this.getEpisodes();
	}

	componentDidUpdate() {
		document.title = this.state.show.title + ': S' + this.props.params.season + ' - Local Stream';
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
							return (
								<ListItem
									key={episode.num}
									primaryText={episode.title}
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