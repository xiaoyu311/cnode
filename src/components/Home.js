import React from 'react';
import axios from 'axios'
import {url} from '../config.js'
import Showtopics from './Showtopics';
import { Card, Tabs, message } from 'antd'
const TabPane = Tabs.TabPane;


class Home extends React.Component{
	constructor(){
		super()
		this.state = {
			tab:[
				"all", "good", "ask", "share", "job"
			],
			data:{
				all:{
					topics:[], page:1
				},
				ask:{
					topics:[], page:1
				},
				share:{
					topics:[], page:1
				},
				good:{
					topics:[], page:1
				},
				job:{
					topics:[], page:1
				}
			}
		}
	}
	getAxios(tab,page){
		axios.get(`${url}/topics?limit=20&tab=${tab==='all'?'':tab}&page=${page}`)
			.then( res => {
				console.log(res)
				let newData = this.state.data
				newData[tab].topics = [...newData[tab].topics, ...res.data.data]
				this.setState({data:newData})
			})
			.catch( err => message.error('YOU SHOULD AGAIN') )
	}
	handleChange(key) {
		if (this.state.data[key].topics.length === 0) {
			this.getAxios(key, 1)
		}else{
			return
		}
	}
	componentWillMount(){
		this.getAxios("all", 1)
	}
	render(){
		let {tab, data} = this.state;
		return(
			<div>
				<Tabs defaultActiveKey='all' onChange={this.handleChange.bind(this)}>
					{
						tab.map( item => 
							<TabPane tab={item} key={item}>
								{
									data[item].topics.length===0?
									<Card loading style={{ width: '100%' }} />
									:
									<Showtopics item={item} data={data[item].topics} />
								}
							</TabPane>
						)
					}					
				</Tabs>
			
				
			</div>
		)
	}
} 
export default Home