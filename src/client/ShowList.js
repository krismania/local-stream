import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const shows = [
	{ name: 'show1' },
	{ name: 'show2' }
]

class ShowList extends React.Component {

	constructor(props) {
		super(props);

		this.handleShowTouchTap = this.handleShowTouchTap.bind(this);
	}

	handleShowTouchTap(name) {
		this.props.onSelectShow(name);
	}

	render() {
		return(
			<GridList cellHeight={180} cols={4}>
				<Subheader>Shows</Subheader>
				{shows.map((show) => (
					<GridTile
						key={Math.random()}
						containerElement="ShowTileContainer"
						title={show.name}
						style={{backgroundColor: 'white', cursor: 'pointer'}}
						onTouchTap={() => this.handleShowTouchTap(show.name)}
					>
					</GridTile>
				))}
			</GridList>
		)
	}
}

export default ShowList;