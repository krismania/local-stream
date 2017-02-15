import React from 'react';
import {browserHistory} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

class ShowList extends React.Component {

	constructor(props) {
		super(props);

		this.state = { numCols: 1 }

		this.handleShowTouchTap = this.handleShowTouchTap.bind(this);
		this.getNumCols = this.getNumCols.bind(this);
	}

	handleShowTouchTap(name) {
		browserHistory.push('/stream/' + name);
	}

	componentWillMount() {
		this.getNumCols();
	}

	componentDidMount() {
		window.addEventListener('resize', this.getNumCols);
		document.title = 'Shows - LocalStream';
	}

	getNumCols() {
		var width = document.getElementsByTagName('body')[0].clientWidth;
		var cols;
		// decide based on page width
		if (width <= 450) cols = 1;
		else if (width <= 670) cols = 2;
		else cols = 3;

		console.log(cols);
		this.setState({ numCols: cols });
	}

	render() {
		return(
			<GridList cellHeight={180} cols={this.state.numCols}>
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
