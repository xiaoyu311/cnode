import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TopicId from './components/TopicId';
import NewTopic from './components/NewTopic';
import Collect from './components/Collect';
import Message from './components/Message';
import Personal from './components/Personal';




class App extends React.Component{
	render(){
		return(
			<div>
				<HashRouter>
					<div>
						<Header />

						<Route path='/' exact component={Home} />
						<Route path='/topic/:id' component={TopicId} />
						<Route path='/messages' component={Message}  />
						<Route path='/user/:loginname' component={Personal} />
						<Route path='/topic_collect/:loginname' component={Collect} />
						<Route path='/topics' component={NewTopic} />

					</div>
				</HashRouter>
			</div>
		)
	}
}
export default App

//HashRouter