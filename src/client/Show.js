import React from 'react';
import {List, ListItem} from 'material-ui/List';

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
			<div>
				<h1>{this.state.show.title}</h1>
				<h3>{this.state.show.year}</h3>
				<List>
					{this.state.show.seasons.map(function(season) {
						return (
							<ListItem
								key={season}
								primaryText={'Season ' + season}
								onTouchTap={() => this.handleSeasonTouchTap(season)}
							/>
						)
					}.bind(this))}
				</List>
			</div>
		)
	}
}

export default Show;