import React from 'react';
import axios from 'axios';
import {url} from '../config.js'
import {NavLink} from 'react-router-dom'
import img from '../images/cnodejs_light.png'
import { Button,  Modal, Input, Icon, message, Avatar, Dropdown, Menu } from 'antd'


class Header extends React.Component{
	constructor(){
		super()
		this.state = {
			visible:false,
			input:'e9aec5bd-eaf5-497c-b307-beaf4a020f6e',
			password:123456789,
			data:null,
			Islogin:false,
			confirmLoading:false
		}
	}
	handleClick(){
		this.setState({
			visible:true,
			data:null
		})
	}
	handleChange(e){
		this.setState({
			input:e.target.value
		})
	}
	handleOk(){
		this.setState({confirmLoading:true})
		let accesstoken = this.state.input;
		axios.post(`${url}/accesstoken`, {accesstoken})//这为啥加大括号
			.then( res => {
				message.success('THIS IS A MESSAGE OF SUCCESS')
				this.setState({
				 	data:res.data ,
				 	Islogin:true,
				 	confirmLoading:false,
				 	input:'',
				 	password:'',

				})
				sessionStorage.accesstoken = accesstoken
				sessionStorage.avatar_url = this.state.data.avatar_url
				sessionStorage.id = this.state.data.id
				sessionStorage.loginname = this.state.data.loginname
			})
			.catch( err =>  {
				message.error('YOU SHOULD AGAIN')
				this.setState({confirmLoading:false})
			})

	}
	handleOut(){
		this.setState({
			visible:false,
			Islogin:false,
			confirmLoading:false
		})
	}
	render(){
		let {visible, input, password, Islogin, confirmLoading, data} = this.state;
		const menu = !Islogin? null :
			(
				<Menu>
					<Menu.Item>
						<h3>{data.loginname}</h3>
					</Menu.Item>
					<Menu.Item>
						<p>personal center</p>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={this.handleOut.bind(this)} type="danger">LOG OUT</Button>
					</Menu.Item>
				</Menu>
			)
		return(
			<header className="header">
				<h1><NavLink to='/'><img src={img} alt="img"/></NavLink></h1>
				{
					Islogin ? 
					<Dropdown overlay={menu}>
						<Avatar size='large' src={data.avatar_url} />
					</Dropdown>
					:
					<div>
						<Button 
						 	type="dashed" 
						 	size="large"
						 	onClick={this.handleClick.bind(this)} >
						 	Login
						</Button>
						<Modal
							style={{marginTop:'150px'}}
							title="Login"
							visible={visible} 
							okText="OK"
							confirmLoading={confirmLoading}
							cancelText="Cancel"
							onOk={this.handleOk.bind(this)}
							onCancel={()=>this.setState({visible:false})}>
							<Input
								value={input}
								onChange={this.handleChange.bind(this)}
								placeholder="accesstoken"
								prefix={<Icon type="user" />}
								/>
							<Input
								style={{marginTop:'10px'}}
								type="password"
								placeholder="password"
								onChange={e=>this.setState({password:e.target.value})}
								value={password}
								prefix={<Icon type="lock" />}
								/>

						</Modal>							
					</div>
				}
			</header>
		)
	}
} 
export default Header