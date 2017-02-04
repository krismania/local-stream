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
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBarComponent />
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;