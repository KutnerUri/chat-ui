import * as React from 'react';
import Message from '../models/message';
import userRepository from '../repositories/userRepository';
import messagesRepository from '../repositories/messagesRepository'

export default class MessagesBoard extends React.Component {
	constructor(props){
		super(props);
		
		this.state = { messages: messagesRepository.get() };

		const handleRepositoryChange = this.handleRepositoryChange.bind(this);
		messagesRepository.subscribe(handleRepositoryChange);

	}

	handleRepositoryChange(messagesList){
		this.setState({ messages: messagesList });
	}

	render(){
		return (
			<div className="messages-board">
				{ this.state.messages.map(msg =>
					<MessageView key={msg.id} message={msg} />
				)}
			</div>
		);
	}
}

class MessageView extends React.Component {
	constructor(props){
		super(props);
		const username = props.message.username;
		this.state = { userimage: userRepository.getUserAvatar(username) };
	}

	render(){
		return (
			<div className="message">
				<div className="username">{this.props.message.username}:</div>

				<img className="userimage" src={this.state.userimage} />
				<span className="content">{this.props.message.content}</span>
			</div>
		);
	}
}