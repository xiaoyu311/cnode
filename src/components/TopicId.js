import React from 'react'
import axios from 'axios';
import {url} from '../config.js'
import { message, Card, Avatar, Icon, Input, Button, Modal, notification } from 'antd';
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
			reply:'',
			tab:{
				share:'分享',
				ask:'问答',
				dev:'客户端测试',
				job:'招聘'
			},
			male:false,
			collect:'',
			select:false
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
		let loginname = sessionStorage.loginname
		let id = this.props.match.params.id
		axios.get(`${url}/topic/${id}`)
			.then( res => {
				this.setState({
					data:res.data.data,
				})
			})
			.then(res =>
				{
					if (loginname) {
						axios.get(`${url}/topic_collect/${loginname}`)
							.then( res => this.setState({collect:res.data.data}) )
							.then( res => {
								var arr = this.state.collect
								for (var i = 0; i < arr.length; i++) {
									if (arr[i].id === this.state.data.id) {
										this.setState({select:true})
										break;
									}
								}
							})
							.catch( err => message.error('Collect') )
					}
				}
			)
			.catch( err =>  message.error('This is a message of error') )
	}
	handleChange(content,e){
		this.setState({
			[content]:e.target.value
		})
	}
	handleClick(){
		this.setState({male:true})
		let id = this.state.data.id
		let accesstoken = sessionStorage.accesstoken
		let content = this.state.TextArea
		if (accesstoken) {
			axios.post(`${url}/topic/${id}/replies`,{accesstoken,content})
				.then( res => {
					this.getData()
					this.setState({
						TextArea:'',
						male:false
					})
					notification.open({
						message: 'SUCCESS',
						description: '评论成功！但是不要乱发容易被封号'
					})
				})
				.catch( err => {
					message.error('This is a message of error') 
					this.setState({
						TextArea:'',
						male:false
					})
				})
		}else{
			message.error('Please Login')
			this.setState({male:false})
			return
		}
		
	}
	handleLike(reply_id){
		let accesstoken = sessionStorage.accesstoken
		if (accesstoken) {
			axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
				.then( res => this.getData())
				.catch( err => message.error('不能给自己点赞') )
		}else{
			message.error('Please Login')
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
			message.error('Please Login')
			return
		}
	}
	handleCollect(){
		let accesstoken = sessionStorage.accesstoken
		let topic_id = this.state.data.id
		let collect = this.state.select? 'de_collect' : 'collect' 
		if (accesstoken) {
			this.setState({select:!this.state.select})
			axios.post(`${url}/topic_collect/${collect}`,{accesstoken,topic_id})
				.then( res =>{
					notification.open({
						message: 'SUCCESS',
						description: '成功'
					})
				})
				.catch(res =>  message.error('This is a message of error') )
		}else{
			message.error('Please Login')
			return
		}
	}
	render(){
	let {data, TextArea, visible, content, title, people, reply, tab, male, select} = this.state
		return(
			<div style={{padding:'10px',overflow:'hidden'}}>
				{
					!data?
					<Card loading style={{ width: '100%' }}></Card>
					:
					<div>
						<h3 style={{color:'#108ee9'}}>{data.title}</h3>
						<p style={{marginTop:'12px',paddingBottom:'10px', borderBottom:'1px solid #ccc'}}>
							发布于：{moment(data.create_at).fromNow()}
							&nbsp;
							<span>作者：</span>
							<span><NavLink to={`/user/${data.author.loginname}`}>{data.author.loginname}</NavLink></span>
							&nbsp;
							<span>浏览量：{data.visit_count}</span>
							&nbsp;
							<span>来自：{tab[data.tab]}</span>
						</p>
						<Button onClick={this.handleCollect.bind(this)} style={{marginTop:'10px'}} type="primary">{!select?'收藏主题':'取消收藏'}</Button>
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
											<div className="details_first">
												<div>
													<span><NavLink to="/">{item.author.loginname}</NavLink></span>
													&nbsp;
													<span>{index+1}楼</span>
													&nbsp;
													<span>{moment(item.create_at).fromNow()}</span>
												</div>
												<div className="zan">
													<Icon style={{cursor: 'pointer'}} onClick={this.handleLike.bind(this,item.id)} type="like" />
													<span>{item.ups.length===0? null : item.ups.length}</span>
													<Icon onClick={this.handleContent.bind(this,item)}  style={{cursor: 'pointer'}} type="message" />
												</div>
											</div>
											<div dangerouslySetInnerHTML={{__html:item.content}} />
										</div>
									</div>
								))
							}
						</div>
					):
					null
				}
				{
					data? 
					<div>
						<h3 style={{marginTop:'30px'}}>发表评论：</h3>
						<Input
							placeholder="Please write your content"
							value={TextArea}
							onChange={this.handleChange.bind(this,'TextArea')}
							type="textarea"
							rows={5} />
						<Button loading={male} style={{marginTop:"10px"}} onClick={this.handleClick.bind(this)} type="primary">content</Button>
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
					:
					null
				}
				
			</div>
		)
	}
}

export default TopicId