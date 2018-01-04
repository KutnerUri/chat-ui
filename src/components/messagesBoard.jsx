import * as React from 'react';
import ReactDOM from 'react-dom';
import MessageComponent from './messageComponent';
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

	componentDidMount() {
		this.scrollToEnd();
	}

	componentDidUpdate() {
		//I know, should only do this if we are already at the bottom.
		this.scrollToEnd();
	}

	scrollToEnd(){
		var that = this;	
		doWhenDomIsReady(function() {
			var thisNode = ReactDOM.findDOMNode(that);
			var lastElement = thisNode.querySelector(".messages-board .message:last-child");
			
			if(!lastElement) return;
			
			lastElement.scrollIntoView({ behavior: "smooth" });
		});

		//cursed black magick
		function doWhenDomIsReady(func){
			setTimeout(function(){
				window.requestAnimationFrame(function() { func() } )
			}, 0);
		}
	}
	

	render(){
		return (
			<div className="messages-board">
				{	this.state.messages.map(msg =>
						<MessageComponent key={msg.id} message={msg} />
				)}
			</div>
		);
	}
}