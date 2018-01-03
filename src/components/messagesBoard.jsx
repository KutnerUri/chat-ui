import * as React from 'react';
import Message from '../models/message';

import { Image } from 'semantic-ui-react';

export default class MessagesBoard extends React.Component {
	render(){
		return (
			<div class="messages-board">
				{ this.props.messages.map(msg =>
					<MessageView key={msg.id} message={msg} />
				)}
			</div>
		);
	}
}

class MessageView extends React.Component {
	render(){
		return (
			<div class="message">
				<div class="username">{this.props.message.username}</div>

				<img class="userimage" src={this.props.message.avatar}/>
				<span class="content">{this.props.message.content}</span>
			</div>
		);
	}
}