import React from 'react';
import AppBar from 'material-ui/AppBar';
import SvgIcon from 'material-ui/SvgIcon';
import {Link} from 'react-router';

import AppIcon from './AppIcon';

const linkStyle = { textDecoration: 'none', color: 'white' }

class AppBarComponent extends React.Component {
	render() {
		return (
			<AppBar
				title={<Link to="/stream" style={linkStyle}>LocalStream</Link>}
				iconElementLeft={AppIcon}
			/>
		);
	}
}

export default AppBarComponent;