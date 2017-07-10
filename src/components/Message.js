import React from 'react';
import axios from 'axios';
import {url} from '../config.js';
import {NavLink} from 'react-router-dom';
import { message, Card, Icon  } from 'antd'
import moment from 'moment';

class Message extends React.Component{
	constructor(){
		super()
		this.state = {
			data:null
		}
	}
	componentDidMount(){
		let accesstoken = sessionStorage.accesstoken
		axios.get(`${url}/messages?accesstoken=${accesstoken}`)
			.then( res => this.setState({data:res.data.data}) )
			.catch( err => message.error(err))
	}
	render(){
		let {data} = this.state
		console.log(data)
		return(
			<div className="Message">
				<h3 className="Message_new"><NavLink to="/">主页</NavLink>/新消息 <Icon type="caret-down" /> </h3>
				{
					data?(
						data.hasnot_read_messages.map( item =>
							<div className="Message_show" key={item.id}>
								<p>
									<NavLink to="/">{item.author.loginname}</NavLink>
									&nbsp;
									&nbsp;
									在文章
									&nbsp;
									&nbsp;
									<NavLink to={`/topic/${item.topic.id}`}>{item.topic.title}</NavLink>
									&nbsp;
									&nbsp;
									{
										item.type === 'reply'?'回复了你' : '@了你'
									}
								</p>
								<p>{moment(item.create_at).fromNow()}</p>
							</div>
						)
					)
				:
				<Card loading />
				}
				<h3 className="Message_notnew">过往消息 <Icon type="caret-down" /> </h3>
				{
					data?(
						data.has_read_messages.map( item=>
							<div className="Message_show" key={item.id}>
								<p>
									<NavLink to="/">{item.author.loginname}</NavLink>
									&nbsp;
									&nbsp;
									在文章
									&nbsp;
									&nbsp;
									<NavLink to={`/topic/${item.topic.id}`}>{item.topic.title}</NavLink>
									&nbsp;
									&nbsp;
									{
										item.type === 'reply'?'回复了你' : '@了你'
									}
								</p>
								<p>{moment(item.create_at).fromNow()}</p>
							</div>
						)
					)
					:
					<Card loading />
				}
			</div>
		)
	}
}

export default Message