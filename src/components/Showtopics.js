import React from 'react';
import { Avatar } from 'antd'

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
		console.log(this.props.data)
		return(
			<div>
				{
					this.props.data.map( item =>(
						<div key={item.id}>
							<Avatar src={item.author.avatar_url} alt="avatar_url" />
							<span>{}</span>
							<div>
								
							</div>
						</div>
					))
				}
			</div>
		)
	}
} 
export default Showtopics