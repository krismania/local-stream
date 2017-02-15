import React from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import SvgIcon from 'material-ui/SvgIcon';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

import AppIcon from './AppIcon';

const styles = {
	loginLabel: {
		marginRight: '8px',
		color: 'rgba(255, 255, 255, 0.87)',
		fontSize: '14px',
		cursor: 'default'
	}
}

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			username: ''
		}

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOpen() {
		this.setState({open: true});
	}

	handleClose() {
		this.setState({open: false});
	}

	handleLogin() {
		this.handleClose();
		this.props.onLogin({ name: this.state.username });
	}

	handleNameChange(event) {
		this.setState({ username: event.target.value });
	}

	handleSubmit(event) {
		this.handleLogin();
		event.preventDefault();
	}

	render() {
		const actions = [
			<FlatButton
				label="Login"
				primary={true}
				onTouchTap={this.handleLogin}
			/>
		];

		return(
			<div>
				<FlatButton
					label="login"
					hoverColor="rgba(255, 255, 255, 0.21)"
					rippleColor="white"
					onTouchTap={this.handleOpen}
					style={{ marginTop: '6px' }}
				/>
				<Dialog
					title="Login"
					open={this.state.open}
					onRequestClose={this.handleClose}
					actions={actions}
				>
					<form onSubmit={this.handleSubmit}>
						<TextField
							autoFocus
							value={this.state.username}
							onChange={this.handleNameChange}
							floatingLabelText="Username"
						/>
					</form>
				</Dialog>
			</div>
		)
	}
}

class Logout extends React.Component {
	render() {
		return (
			<div>
				<span style={styles.loginLabel}>{this.props.label}</span>
				<FlatButton
					label="Logout"
					hoverColor="rgba(255, 255, 255, 0.21)"
					rippleColor="white"
					onTouchTap={this.props.onLogout}
					style={{ marginTop: '6px' }}
				/>
			</div>
		)
	}
}

const linkStyle = { textDecoration: 'none', color: 'white' }

class AppBarComponent extends React.Component {
	render() {
		return (
			<AppBar
				title={<Link to="/stream" style={linkStyle}>LocalStream</Link>}
				iconElementLeft={AppIcon}
				iconElementRight={this.props.user ? <Logout label={'Hi, ' + this.props.user.name + '!'} onLogout={this.props.onLogout} /> : <Login onLogin={this.props.onLogin} />}
			/>
		);
	}
}

export default AppBarComponent;