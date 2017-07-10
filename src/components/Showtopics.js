import React from 'react';
import { Avatar} from 'antd'
import {NavLink} from 'react-router-dom'

class Showtopics extends React.Component{
	constructor(){
		super()
		this.state = {
			tabs:{
				share:'分享',
				ask:'问答',
				job:'招聘'
			}
		}
	}
	render(){
		let {tabs} = this.state;
		return(
			<div>
				{
					this.props.data.map( item =>(
						<div className="Showtopics" key={item.id}>
							<div className="Showtopics_left">
								<NavLink to={`/user/${item.author.loginname}`}><Avatar src={item.author.avatar_url} alt="avatar_url" /></NavLink>
								&nbsp;
								&nbsp;
								<span style={{background: item.top? '#80bd01':item.good? '#80bd01' :'#999'}} className="Showtopics_left_span">{item.top? '置顶' : item.good?'精华' :tabs[item.tab]}</span>
							</div>
							<div className="Showtopics_right">
								<h3><NavLink to={`/topic/${item.id}`}>{item.title}</NavLink></h3>
								<span>发布话题：{item.reply_count}</span>
								&nbsp;
								&nbsp;
								<span>粉丝量：{item.visit_count}</span>
							</div>
						</div>
					))
				}
				
			</div>
		)
	}
} 
export default Showtopics