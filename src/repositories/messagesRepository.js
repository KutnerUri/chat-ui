import RepositoryBase from './repositoryBase';

export class MessagesRepository extends RepositoryBase {
	constructor() {
		super("messagesRepository");
		this._state = [];
		this._messagesToSend = [];
		this._existingMessagesIds = {};

		this.restorePersistence();
	}

	addUserMessage(message) {
		this._messagesToSend.push(message); //needs to happen first
		this.addMessage(message);
	}

	addExternalMessage(message){
		var isExistingMessage = this._existingMessagesIds.hasOwnProperty(message.id);
		if(isExistingMessage) return;

		this.addMessage(message);
	}

	getAll() {
		return this._state.concat([]);
	}

	shiftUnsentMessage(){
		var msg = this._messagesToSend.shift();

		this.persisteState();

		return msg;
	}

	restoreFromMemento(memento) {
		if (memento.messagesList) {
			this._state = memento.messagesList;

			for(var i = 0 ; i < memento.messagesList.length; i++){
				var id = memento.messagesList[i];
				this._existingMessagesIds[id] = true;
			}
		}

		if (memento.unsentMessages) {
			_messagesToSend: this.unsentMessages
		}
	}

	createMemento() {
		return {
			messagesList: this._state,
			unsentMessages: this._messagesToSend
		};
	}

	addMessage(message){
		this._state.push(message);
		this._existingMessagesIds[message.id] = true;

		this.persisteState();
		this.updateSubscribers();
	}
}

var instance = new MessagesRepository();
export default instance;