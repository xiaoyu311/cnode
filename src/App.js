import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TopicId from './components/TopicId';
import Message from './components/Message';
import Personal from './components/Personal';
import Footer from './components/Footer';

class App extends React.Component{
	render(){
		return(
			<div>
				<BrowserRouter>
					<div>
						<Header />

						<Route path='/' exact component={Home} />
						<Route path='/topic/:id' component={TopicId} />
						<Route path='/messages' component={Message} />
						<Route path='/user/:loginname' component={Personal} />

						<Footer />
					</div>
				</BrowserRouter>
			</div>
		)
	}
} 
export default App