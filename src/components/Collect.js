import React from 'react'
import axios from 'axios';
import {url} from '../config.js';
import {NavLink} from 'react-router-dom';
import { message, Icon, Avatar, Card, Pagination } from 'antd'
import moment from 'moment';


class Collect extends React.Component{
	constructor(){
		super()
		this.state = {
			data:null
		}
	}
	componentDidMount(){
		let accesstoken = this.props.match.params.loginname
		axios.get(`${url}/topic_collect/${accesstoken}`)
			.then( res => this.setState({data:res.data.data}) )
			.catch( err => message.error('Piease Login') )
	}
	render(){
		let {data} = this.state
		return(
			<div className="Collect">
				<h3><NavLink to="/">主页</NavLink><span>/收藏</span></h3>
				{
					data?
					<div className="Collect_first">
						{
							data.map( (item)=>
								<div className="Collect_show" key={item.id}>
									<div className="Collect_show_left">
										<NavLink to={`/user/${item.author.loginname}`}><Avatar src={item.author.avatar_url} alt="author" /></NavLink>
										<span style={{fontSize:'12px',background:'#80bd01',color:'#fff',padding:'1px 4px',borderRadius:'4px',display:item.top?'block': item.good?'block':'none'}} >{item.top?'置顶':item.good?'精华':null}</span>
									</div>
									<div style={{width:'55%'}}>
										<span><NavLink to={`/topic/${item.id}`}>{item.title}</NavLink></span>	
										<p className="number">
											<span>粉丝量：{item.reply_count}</span>
											&nbsp;
											&nbsp;
											<span>浏览量：{item.visit_count}</span>
										</p>
									</div>
									<div className="Collect_show_rigth">
										<Avatar size="small" src={item.author.avatar_url} />
										<span>{moment(item.create_at).fromNow()}</span>	
									</div>
								</div>
							)
						}
						<div style={{display:data.length===0?'none':'block'}}>
							 <Pagination simple={true} defaultPageSize={10} total={data.length} />
						</div>
						
					</div>
					:
					<Card loading style={{width:'100%'}} />
				}
				
			</div>
		)
	}
}

export default Collect
