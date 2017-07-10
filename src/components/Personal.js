import React from 'react'
import axios from 'axios';
import {url} from '../config.js';
import {NavLink} from 'react-router-dom';
import { message, Icon, Avatar, Card } from 'antd'
import moment from 'moment';


class Personal extends React.Component{
	constructor(){
		super()
		this.state = {
			data:null
		}
	}
	componentDidMount(){
		let loginname = this.props.match.params.loginname
		if (loginname) {
			axios.get(`${url}/user/${loginname}`)
				.then( res => this.setState({data:res.data.data}) )
				.catch( err => message.error('Please Login') )
		}
	}
	render(){
		let {data} = this.state;
		return(
			<div>
				{
					data?
					<div className="Personal_big">
						<div className="Personal_top">
							<h3><NavLink to="/">主页&nbsp;&nbsp;<Icon type="aliwangwang-o" /></NavLink></h3>
							<Avatar style={{marginTop:'15px'}} src={data.avatar_url} />
							<span>{data.loginname}</span>
							<span>积分：{data.score}</span>
							<span><Icon type="github" />&nbsp;&nbsp;{data.githubUsername}</span>
							<span>注册时间：{moment(data.create_at).fromNow()}</span>
						</div>
						<div>
							<h3 className="newTopics">最近创建的话题</h3>
							{
								data.recent_topics.map( item => 
									<div className="Personal_show" key={item.id}>
										<div className="people">
											<Avatar src={item.author.avatar_url} />
											&nbsp;
											&nbsp;
											<span>{item.author.loginname}</span>	
										</div>
										<span>{item.title}</span>
										<span>{moment(item.last_reply_at).fromNow()}</span>
									</div>
								)
							}
							<h3 className="newTopics">最近参与的话题</h3>
							{
								data.recent_replies.map( item => 
									<div className="Personal_show" key={item.id}>
										<div className="people">
											<Avatar src={item.author.avatar_url} />
											&nbsp;
											&nbsp;
											<span>{item.author.loginname}</span>	
										</div>
										<span>{item.title}</span>
										<span>{moment(item.last_reply_at).fromNow()}</span>
									</div>
								)
							}
						</div>
					</div>
					:
					<Card loading style={{width:'100%'}} />
				}
			</div>
		)
	}
}

export default Personal




	



