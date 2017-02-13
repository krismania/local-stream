import React from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import SvgIcon from 'material-ui/SvgIcon';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

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
		event.preventDefault;
		this.handleLogin();
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
				<span style={{ marginRight: '8px' }}>{this.props.label}</span>
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
const icon = <path d="M12,3L2,12h3v8h14v-8h3L12,3z M12,18.14c-2.7,0-4.9-2.19-4.9-4.9c0-2.7,2.19-4.9,4.9-4.9s4.9,2.19,4.9,4.9 C16.9,15.95,14.7,18.14,12,18.14z M13.27,10.7h1.27v5.09h-1.27V10.7z M9.46,10.7l3.39,2.54l-3.39,2.54V10.7z" />;

class AppBarComponent extends React.Component {
	render() {
		return (
			<AppBar
				title={<Link to="/stream" style={linkStyle}>LocalStream</Link>}
				iconElementLeft={(
					<SvgIcon style={{ width: '36px', height: '36px', paddingTop: '6px' }}>
						{icon}
					</SvgIcon>
				)}
				iconElementRight={this.props.loggedIn ? <Logout label={'Hi, ' + this.props.user.name + '!'} onLogout={this.props.onLogout} /> : <Login onLogin={this.props.onLogin} />}
			/>
		);
	}
}

export default AppBarComponent;