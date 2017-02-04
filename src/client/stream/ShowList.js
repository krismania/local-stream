import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const shows = [
	{ name: 'show1' },
	{ name: 'show2' }
]

class ShowList extends React.Component {
	render() {
		return(
			<GridList cellHeight={180}>
				<Subheader>Shows</Subheader>
				{shows.map((show) => (
					<GridTile
						key={Math.random()}
						title={show.name}
					>
					</GridTile>
				))}
			</GridList>
		)
	}
}

export default ShowList;