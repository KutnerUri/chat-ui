import * as React from 'react';
import MessageComponent from './MessageComponent';
import messagesRepository from '../repositories/messagesRepository'

export default class MessagesBoard extends React.Component {
	constructor(props){
		super(props);
		
		this.state = { messages: messagesRepository.getAll() };

		const handleRepositoryChange = this.handleRepositoryChange.bind(this);
		messagesRepository.subscribe(handleRepositoryChange);

	}

	handleRepositoryChange(){
		const messagesList = messagesRepository.getAll();
		this.setState({ messages: messagesList });
	}

	render(){
		return (
			<div className="messages-board">
				{ this.state.messages.map(msg =>
					<MessageComponent key={msg.id} message={msg} />
				)}
			</div>
		);
	}
}