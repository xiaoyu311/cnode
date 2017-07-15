import React from 'react';
import axios from 'axios';
import {url} from '../config.js'
import {withRouter, NavLink} from 'react-router-dom'
import img from '../images/cnodejs_light.png'
import { Button,  Modal, Input, Icon, message, Avatar, Dropdown, Menu, Badge} from 'antd'


class Header extends React.Component{
	constructor(){
		super()
		this.state = {
			visible:false,
			input:'e9aec5bd-eaf5-497c-b307-beaf4a020f6e',
			password:123456789,
			data:null,
			Islogin:false,
			confirmLoading:false,
			messages:0
		}
	}
	handleClick(){
		this.setState({
			visible:true,
			data:null
		})
	}
	handleChange(e) {
		this.setState({
			input: e.target.value
		})
	}
	handleOk(){
		this.setState({confirmLoading:true})
		let accesstoken = this.state.input;
		axios.post(`${url}/accesstoken`, {accesstoken})
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
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
			.then( res => this.setState({messages:res.data.data}) )
			.catch( err => message.error(err) )
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
		sessionStorage.clear()
	}
	handleFun(){
		this.setState({
			messages:0
		})
	}
	render(){
		let {visible, input, password, Islogin, confirmLoading, data, messages} = this.state;
		const menu = !Islogin? null :
			(
				<Menu>
					<Menu.Item>
						<h3>{data.loginname}</h3>
					</Menu.Item>
					<Menu.Item>
						<p><NavLink to={`/user/${sessionStorage.loginname}`}>Personal center</NavLink></p>
					</Menu.Item>
					<Menu.Item>
						<p onClick={this.handleFun.bind(this)}><NavLink to={{pathname:'/messages',state:this.fun}}>Message</NavLink></p>
					</Menu.Item>
					<Menu.Item>
						<p><NavLink to='/Topics'>New Topic</NavLink></p>
					</Menu.Item>
					<Menu.Item>
						<p><NavLink to={`/topic_collect/${data.loginname}`}>Your Collect</NavLink></p>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={this.handleOut.bind(this)} type="danger">LOG OUT</Button>
					</Menu.Item>
				</Menu>
			)
		return(
			<header className="header">
				<Icon onClick={()=>this.props.history.goBack()} style={{fontSize:'30px',color:'#fff'}} type="left-circle" />
				<h1><NavLink to='/'><img src={img} alt="img"/></NavLink></h1>
				{
					Islogin ?
					<Dropdown trigger={['click']} overlay={menu}>
						<Badge showZero count={messages}>
							<Avatar size='large' src={data.avatar_url} />
						</Badge>
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
							style={{marginTop:'50px'}}
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
export default withRouter(Header)


//4e30943f-f3ec-4d59-b897-f97f2418cfb9
