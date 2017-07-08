import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

class App extends React.Component{
	render(){
		return(
			<div>
				<BrowserRouter>
					<div>
						<Header />

						<Route path='/' exact component={Home} />

						<Footer />
					</div>
				</BrowserRouter>
			</div>
		)
	}
} 
export default App