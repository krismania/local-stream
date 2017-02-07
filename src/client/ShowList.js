import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

class ShowList extends React.Component {

	constructor(props) {
		super(props);

		this.handleShowTouchTap = this.handleShowTouchTap.bind(this);
	}

	handleShowTouchTap(name) {
		window.location = '/stream/' + name;
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
						subtitle={show.seasons + ' season' + (show.seasons > 1 ? 's' : '')}
						style={{backgroundColor: 'white', cursor: 'pointer'}}
						onTouchTap={() => this.handleShowTouchTap(show.id)}
					>
					</GridTile>
				))}
			</GridList>
		)
	}
}

export default ShowList;