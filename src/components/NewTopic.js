import React from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios'
import {url} from '../config.js';
import { Icon, Select, Input, Button, message, notification } from 'antd'
const Option = Select.Option;


class NewTopic extends React.Component{
	constructor(){
		super()
		this.state = {
			tab:'请选择',
			title:'',
			content:'',
			male:false
		}
	}
	handleClick(){
		let accesstoken = sessionStorage.accesstoken
		let {tab, title, content} = this.state
		let data = {accesstoken, tab, title, content}
		this.setState({male:true})
		if (accesstoken) {
			axios.post(`${url}/topics`,data)
			.then( res => 
				{
					notification.open({
						message: 'SUCCESS',
						description: '发帖成功！但是不要乱发容易被封号'
					})
					this.setState({
						tab:'请选择',
						title:'',
						content:'',
						male:false
					})
				}
			)
			.catch( err => {
				message.error(err)
				this.setState({
					male:false
				})
			})
		}else{
			message.error('Please Login')
			return
		}
	}
	handleChange(value) {
		this.setState({
			tab:value
		})
	}
	handleInput(value, e){
		this.setState({
			[value]:e.target.value
		})
	}
	render(){
		let {tab, title, content, male} = this.state
		return(
			<div className="NewTopic">
				<h3 className="Message_new"><NavLink to="/">主页</NavLink>&nbsp;<Icon type="aliwangwang-o" /></h3>
				<label htmlFor=""><span style={{fontWeight:'600',color:'#108ee9', fontSize:'14px'}}>选择模块：</span></label>
				<Select value={tab} onChange={this.handleChange.bind(this)} style={{ width: 120 }}>
					<Option value="share">分享</Option>
					<Option value="ask">问答</Option>
					<Option value="job">招聘</Option>
					<Option value="dev">客户端测试</Option>
				</Select>
				 <Input style={{marginTop:'20px'}} onChange={this.handleInput.bind(this,'title')} value={title} size="large" placeholder="标题字数10字以上" />
				 <h3 style={{color:'#108ee9', marginTop:'20px'}}>内容展示：</h3>
				 <Input rows={5} onChange={this.handleInput.bind(this,'content')} value={content} type="textarea" placeholder="内容：(支持markdown语法)" />
				 <Button style={{marginTop:'10px'}} loading={male} onClick={this.handleClick.bind(this)} type="primary">OK</Button>


			</div>
		)
	}
}

export default NewTopic
