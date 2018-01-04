import messagesRepository from '../repositories/messagesRepository'
import userRepository from '../repositories/userRepository'
import io from "socket.io-client";
import Message from '../models/message';

const CHAT_EVENT = 'spotim/chat';
const SERVER_ADDR = "https://spotim-demo-chat-server.herokuapp.com";

export default class ServerSocket {
	constructor(){
		messagesRepository.subscribe(this.handleLocalMessages.bind(this));
	}

	start(){
		this._socket = io(SERVER_ADDR);
		var startSending = this.sendAllAvailable.bind(this);

		this._socket.on("connect", function() {
			console.log("connected to chat server!");

			startSending();
		});
		this._socket.on("disconnect", function() {
			console.log("disconnected from chat server!");
		});
		
		this._socket.on(CHAT_EVENT, this.handleExternalMessages.bind(this));
	}

	handleExternalMessages(msgDto) {
		console.log("received message", msgDto);

		var msg = dtoToMessage(msgDto);
		messagesRepository.addExternalMessage(msg);
	}

	handleLocalMessages() {
		this.sendAllAvailable();
	}

	sendAllAvailable(){
		if(!this._socket.connected) return;
		
		var message = messagesRepository.shiftUnsentMessage();
		while(!!message){
			this.sendMessage(message);
			message = messagesRepository.shiftUnsentMessage();
		}
	}

	sendMessage(message) {
		var dto = messageToDo(message);
		console.log("sending...", dto.text);
		this._socket.emit(CHAT_EVENT, dto);	//sadly, no acks from server
	}
}

function messageToDo(message) {
	const userAvatar = userRepository.getUserAvatar(message.username);

	return {
		avatar	: userAvatar,
		username: message.username,
		text	: message.text,
		id		: message.id
	};
}

function dtoToMessage(dto) {
	var msg = new Message(dto.username, dto.text, dto.id);
	msg.id = dto.id;

	userRepository.assignUserAvatar(dto.username, dto.avatar);

	return msg;
}