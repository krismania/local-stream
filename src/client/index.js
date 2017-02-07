import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import App from './App';
import Stream from './Stream';
import Show from './Show';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/stream" component={App}>
			<IndexRoute component={Stream} />
			<Route path="/stream/:id" component={Show} />
		</Route>
	</Router>,
	document.getElementById('root')
);