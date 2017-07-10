import React from 'react'
import axios from 'axios';
import {url} from '../config.js'
import { message, Card, Avatar, Icon, Input, Button, Modal } from 'antd';
import {NavLink} from 'react-router-dom'
import moment from 'moment';

class TopicId extends React.Component{
	constructor(){
		super()
		this.state = {
			data:null,
			TextArea:'',
			visible:false,
			content:'',
			title:'',
			people:'',
			reply:''
		}
	}
	getData(){
		let id = this.props.match.params.id
		axios.get(`${url}/topic/${id}`)
			.then( res => {
				this.setState({
					data:res.data.data,
				})
			})
			.catch( err =>  message.error('This is a message of error') )
	}
	componentDidMount(){
		this.getData()
	}
	handleChange(content,e){
		this.setState({
			[content]:e.target.value
		})
	}
	handleClick(){
		let id = this.state.data.id
		let accesstoken = sessionStorage.accesstoken
		if (accesstoken) {
			axios.post(`${url}/topic/${id}/replies`,{accesstoken,content})
				.then( res => {
					this.getData()
					this.setState({
						TextArea:''
					})	
				})
				.catch( err => message.error('This is a message of error') )
		}else{
			message.error('This is a message of error')
			return
		}
		
	}
	handleLike(reply_id){
		let accesstoken = sessionStorage.accesstoken
		if (accesstoken) {
			axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
				.then( res => this.getData())
				.catch( err => message.error('This is a message of error') )
		}else{
			message.error('This is a message of error')
			return
		}

	}
	handleContent(reply){
		this.setState({
			visible:true,
			title:`@${reply.author.loginname}`,
			reply:reply,
			people:`@${reply.author.loginname} `
		})
	}
	handleOk(){
		let id = this.state.data.id
		let reply_id = this.state.reply.id
		let content = this.state.people
		let accesstoken = sessionStorage.accesstoken
		let data = {reply_id,content,accesstoken}
		if (accesstoken) {
			axios.post(`${url}/topic/${id}/replies`,data)
				.then( res => {
					this.getData()
					this.setState({
						people:'',
						visible:false,
					})
				})
				.catch( err => message.error('This is a message of error') )
		}else{
			message.error('This is a message of error')
			return
		}
	}
	render(){
	let {data, TextArea, visible, content, title, people, reply} = this.state
		return(
			<div id="TopicId">
				{
					!data?
					<Card loading style={{ width: '100%' }}></Card>
					:
					<div>
						<h3>{data.title}</h3>
						<p>
							发布于：{moment(data.replies.create_at).fromNow()}
							&nbsp;
							&nbsp;
							<span><NavLink to="/">{data.author.loginname}</NavLink></span>
						</p>
						<div id="other" dangerouslySetInnerHTML={{ __html: data.content}} />
						
					</div>
				}
				{
					data?(
						<div>
							{
								data.replies.map( (item, index) => (
									<div className="show" key={item.id}>
										<Avatar src={item.author.avatar_url} alt="author" />
										<div className="details">
											<span><NavLink to="/">{item.author.loginname}</NavLink></span>
											&nbsp;
											&nbsp;
											<span>{index+1}楼</span>
											&nbsp;
											&nbsp;
											<span>{moment(item.create_at).fromNow()}</span>
											<h4 dangerouslySetInnerHTML={{__html:item.content}} />
										</div>
										<div className="zan">
											<Icon style={{cursor: 'pointer'}} onClick={this.handleLike.bind(this,item.id)} type="like" />
											<span>{item.ups.length===0? null : item.ups.length}</span>
											<Icon onClick={this.handleContent.bind(this,item)}  style={{cursor: 'pointer'}} type="message" />
										</div>
									</div>
								))
							}
						</div>
					):
					null
				}
				<h3 style={{marginTop:'30px'}}>发表评论：</h3>
				<Input
					placeholder="Please write your content"
					value={TextArea}
					onChange={this.handleChange.bind(this,'TextArea')}
					type="textarea"
					rows={5} />
				<Button style={{marginTop:"10px"}} onClick={this.handleClick.bind(this)} type="primary">content</Button>
				<Modal
					title={title}
					okText="OK"
					cancelText="Cancel"
					visible={visible}
					onOk={this.handleOk.bind(this)}
					onCancel={() => this.setState({visible:false,people:''})}>
					<Input
						placeholder="Please write your content"
						value={people}
						onChange={this.handleChange.bind(this,'people')}
						type="textarea"
						rows={5} />	
				</Modal>
			</div>
		)
	}
}

export default TopicId