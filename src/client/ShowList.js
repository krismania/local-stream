import React from 'react';
import {browserHistory} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

class ShowList extends React.Component {

	constructor(props) {
		super(props);

		this.handleShowTouchTap = this.handleShowTouchTap.bind(this);
	}

	handleShowTouchTap(name) {
		browserHistory.push('/stream/' + name);
	}

	componentDidMount() {
		document.title = 'Shows - Local Stream';
	}

	render() {
		return(
			<GridList cellHeight={180} cols={4}>
				<Subheader>Shows</Subheader>
				{this.props.shows.map((show) => (
					<GridTile
						key={Math.random()}
						containerElement="ShowTileContainer"
						title={show.title}
						subtitle={show.seasons.length + ' season' + (show.seasons.length === 1 ? '' : 's')}
						style={{backgroundColor: 'white', cursor: 'pointer'}}
						onTouchTap={() => this.handleShowTouchTap(show.id)}
					>
						<img src={show.cover ? show.cover : '/static/cover-default.png'} />
					</GridTile>
				))}
			</GridList>
		)
	}
}

export default ShowList;