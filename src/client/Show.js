import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import NumberedAvatar from './NumberedAvatar';

class Show extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 
			show: { title: '', year: '', seasons: [] }
		};

		this.getShowInfo = this.getShowInfo.bind(this);
		this.handleSeasonTouchTap = this.handleSeasonTouchTap.bind(this);
	}

	componentDidMount() {
		this.getShowInfo();
	}

	componentDidUpdate() {
		document.title = this.state.show.title + ' - Local Stream';
	}

	getShowInfo() {
		fetch('/api/shows/' + this.props.params.id)
		.then(res => res.json())
		.then(res => this.setState({ show: res }));
	}

	handleSeasonTouchTap(season) {
		window.location = '/stream/' + this.props.params.id + '/S' + season;
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
					style={{ cursor: 'pointer' }}
				>
					<img
						src={this.state.show.cover ? this.state.show.cover : '/static/cover-default.png'}
						style={{ borderRadius: '2px 2px 0 0', minHeight: '300px', background: 'white' }}
					/>
				</CardMedia>
				<CardText>
					<List>
						<Subheader>Seasons</Subheader>
						{this.state.show.seasons.map(function(season) {
							return (
								<ListItem
									key={season.num}
									primaryText={season.title}
									leftAvatar={NumberedAvatar(season.num)}
									onTouchTap={() => this.handleSeasonTouchTap(season.num)}
								/>
							)
						}.bind(this))}
					</List>
				</CardText>
			</Card>
		)
	}
}

export default Show;