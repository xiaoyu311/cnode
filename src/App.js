import React from 'react';

import { HashRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

class App extends React.Component{
	render(){
		return(
			<div>
				<HashRouter>
					<div>
						<Header />

						<Route path='/' exact component={Home} />

						<Footer />
					</div>
				</HashRouter>
			</div>
		)
	}
} 
export default App