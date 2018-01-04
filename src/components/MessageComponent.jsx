import * as React from 'react';
import userRepository from '../repositories/userRepository';

export default class MessageComponent extends React.Component {
	constructor(props){
		super(props);
		const username = props.message.username;
		this.state = {
			userimage: userRepository.getUserAvatar(username),
			isCurrentUser: username === userRepository.getLoggedinUser()
		};

		var handler = this.handlerCurrentUserChange.bind(this);
		userRepository.subscribe(handler);
	}

	handlerCurrentUserChange(newUsername){
		this.setState({
			isCurrentUser: this.props.message.username === newUsername
		})
	}

	render(){
		const classes = "message" + (this.state.isCurrentUser ? " current-user" : "");

		return (
			<div className={classes}>
				<div className="username">{this.props.message.username}:</div>

				<img className="userimage" src={this.state.userimage} />
				<span className="content">{this.props.message.content}</span>
			</div>
		);
	}
}