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
import CastControls from './CastControls';
import Chromecast from './Chromecast';


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

// create chromecast instance
const chromecast = new Chromecast();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			user: null,
			chromecast: chromecast,
			casting: false,
			castName: ''
		}

		this.validateUser = this.validateUser.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleCastConnect = this.handleCastConnect.bind(this);
		this.handleCastDisconnect = this.handleCastDisconnect.bind(this);
	}

	componentWillMount() {
		// check if a username is stored already
		var storedUsername = localStorage.getItem('username');
		if (storedUsername) {
			this.handleLogin({ name: storedUsername });
		}

		// add chromecast event listeners
		chromecast.addEventListener('connect', this.handleCastConnect);
		chromecast.addEventListener('disconnect', this.handleCastDisconnect);
	}

	handleCastConnect(castName) {
		this.setState({ casting: true, castName: castName });
	}

	handleCastDisconnect() {
		this.setState({ casting: false, castName: '' });
	}

	validateUser(user, callback) {
		// authenticate user with server
		fetch('/user/authenticate',
		{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: user.name })
		})
		.then(res => res.json())
		.then(json => callback(json.authenticated));
	}

	handleLogin(user) {
		this.validateUser(user, (valid) => {
			console.log('authenticated: ' + valid);
			if (valid) {
				// save username in localstorage
				localStorage.setItem('username', user.name);
				this.setState({ user: user });
			} else {
				// clear invalid login info
				alert('Bad username. Check that you\'ve created this account.');
				this.handleLogout();
			}
		});
	}

	handleLogout() {
		// unset saved username
		localStorage.removeItem('username');
		this.setState({ user: null });
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBarComponent
						onLogin={this.handleLogin}
						onLogout={this.handleLogout}
						user={this.state.user}
					/>
					<div className="container">
						{React.cloneElement(this.props.children, this.state)}
					</div>
					<CastControls
						casting={this.state.casting}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
