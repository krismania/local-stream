import React from 'react';
import AppBar from 'material-ui/AppBar';
import SvgIcon from 'material-ui/SvgIcon';
import {Link} from 'react-router';

const linkStyle = { textDecoration: 'none', color: 'white' }
const icon = <path d="M12,3L2,12h3v8h14v-8h3L12,3z M12,18.14c-2.7,0-4.9-2.19-4.9-4.9c0-2.7,2.19-4.9,4.9-4.9s4.9,2.19,4.9,4.9 C16.9,15.95,14.7,18.14,12,18.14z M13.27,10.7h1.27v5.09h-1.27V10.7z M9.46,10.7l3.39,2.54l-3.39,2.54V10.7z" />;

class AppBarComponent extends React.Component {
	render() {
		return (
			<AppBar
				title={<Link to="/stream" style={linkStyle}>LocalStream</Link>}
				iconElementLeft={(
					<SvgIcon style={{ width: '48px', height: '48px' }}>
						{icon}
					</SvgIcon>
				)}
			/>
		);
	}
}

export default AppBarComponent;