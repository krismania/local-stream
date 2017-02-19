import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';

class CastControls extends React.Component {

	constructor(props) {
		super(props);

		this.styles = {
			paper: {
				position: 'fixed',
				bottom: '0',
				left: '0',
				right: '0',
				width: '100%',
				height: '64px',
				backgroundColor: this.props.muiTheme.palette.primary1Color
			}
		}
	}

	render() {
		return (
			<div style={{ width: '100%', height: '64px', display: this.props.casting ? 'block' : 'none' }}>
				<Paper
					style={this.styles.paper}
					zDepth={2}
					rounded={false}
				>
					Cast Controls
				</Paper>
			</div>
		)
	}
}

export default muiThemeable()(CastControls);
