import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
	deepOrange500, deepOrange700, deepOrange300,
	amberA400,
	fullWhite, darkWhite, lightWhite
} from 'material-ui/styles/colors';

import './App.css';
import AppBarComponent from './AppBarComponent';


// create the material theme
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: deepOrange500,
		primary2Color: deepOrange700,
		primary3Color: deepOrange300,
		accent1Color: amberA400,
		textColor: darkWhite,
		secondaryTextColor: lightWhite,
		alternateTextColor: fullWhite,
		canvasColor: '#303030',
		disabledColor: lightWhite,
	}
});

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			loggedIn: false,
			user: null
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogin() {
		console.log('app-level login');
		this.setState({ loggedIn: true, user: {name: 'krismania'} });
	}

	handleLogout() {
		console.log('app-level logout');
		this.setState({ loggedIn: false, user: null });
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBarComponent
						onLogin={this.handleLogin}
						onLogout={this.handleLogout}
						loggedIn={this.state.loggedIn}
						user={this.state.user}
					/>
					<div className="container">
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;