import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import App from './components/App';

import {
	BrowserRouter as Router
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';



const store = configureStore();

store.subscribe(() => {
	console.log("Store updated!", store.getState());
});


ReactDOM.render((
	<Provider store={store}>
		<Router basename={process.env.PUBLIC_URL}>
			<App />
		</Router>
	</Provider>	
	), document.getElementById('root'));

registerServiceWorker();
