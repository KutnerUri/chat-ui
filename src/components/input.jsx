import * as React from 'react';
import Message from '../models/message';
import messagesRepository from '../repositories/messagesRepository';
import userRepository from '../repositories/userRepository';
import inputRepository from '../repositories/inputRepository';

const _storage = window.localStorage;

export default class InputBox extends React.Component {
	constructor(props){
		super(props);

		var username = userRepository.getLoggedinUser() || "";
		var content = inputRepository.get() || "";

		this.state = { content: content, username: username };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.clearState = this.clearState.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	handleChange(e){
		var content = e.target.value;
		this.setState({ content: content });

		inputRepository.set(content);
	}

	handleUsernameChange(e){
		var username = e.target.value;
		this.setState({ username: username });

		userRepository.setLoggedinUser(username);
	}

	handleSubmit(e){
		if(!this.isValid()) return;

		const username = this.state.username.trim();
		const content = this.state.content.trim();
		const msg = new Message(username, content);
		messagesRepository.add(msg);

		this.clearState();
	}

	handleKeyPress(e){
		if (e.key == 'Enter') {
			this.handleSubmit(e);
		}
	}

	isValid(){
		return this.state.content != '' && this.state.username != '';
	}

	clearState() {
		this.setState({content: ''});
	}

	render() {
		return (
			<div className="input-box">
				<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
				<input type="text" value={this.state.content} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
				<button disabled={!this.isValid()} onClick={this.handleSubmit}>add</button>
			</div>
		);
	}
}