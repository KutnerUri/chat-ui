import * as React from 'react';
import Message from '../models/message';
import userRepository from '../repositories/userRepository';
import messagesRepository from '../repositories/messagesRepository'

export default class MessagesBoard extends React.Component {
	constructor(props){
		super(props);
		this.state = { messages: [] };
		
		const handleRepositoryChange = this.handleRepositoryChange.bind(this);
		messagesRepository.subscribe(handleRepositoryChange);

	}

	handleRepositoryChange(messagesList){
		this.setState({ messages: messagesList });
	}

	render(){
		return (
			<div class="messages-board">
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
			<div class="message">
				<div class="username">{this.props.message.username}:</div>

				<img class="userimage" src={this.state.userimage} />
				<span class="content">{this.props.message.content}</span>
			</div>
		);
	}
}