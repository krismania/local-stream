import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import App from './shared/App';
// import page components
import Stream from './stream/Stream';
import Admin from './admin/Admin';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="/stream" component={Stream} />
			<Route path="/stream/admin" component={Admin} />
		</Route>
	</Router>,
	document.getElementById('root')
);