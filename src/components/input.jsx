import * as React from 'react';
import Message from '../models/message'

export default class InputBox extends React.Component {
	constructor(props){
		super(props);

		this.state = {value: '', username: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.clearState = this.clearState.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	handleChange(e){
		this.setState({value: e.target.value});
	}

	handleUsernameChange(e){
		this.setState({ username: e.target.value });
	}

	handleSubmit(e){
		if(!this.isValid()) return;

		var msg = new Message(this.state.username, this.state.value);

		this.clearState();

		this.props.onMessageCreated(msg);
	}

	handleKeyPress(e){
		if (e.key == 'Enter') {
			this.handleSubmit(e);
		}
	}

	isValid(){
		return this.state.value != '' && this.state.username != '';
	}

	clearState() {
		this.setState({value: ''});
	}

	render() {
		return (
			<div className="input-box">
				<input type="text" onChange={this.handleUsernameChange}/>
				<input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
				<button disabled={!this.isValid()} onClick={this.handleSubmit}>add</button>
			</div>
		);
	}
}