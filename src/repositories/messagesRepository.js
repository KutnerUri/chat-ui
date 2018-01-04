import RepositoryBase from './repositoryBase';

export class MessagesRepository extends RepositoryBase {
	constructor() {
		super("messagesRepository");
		this.restorePersistence();
		this._state = [];
		this._messagesToSend = [];

		this.restorePersistence();
	}

	addUserMessage(message) {
		this._state.push(message);
		this._messagesToSend.push(message);

		this.persisteState();
		this.updateSubsribers();
	}

	getAll() {
		return this._state.concat([]);
	}

	shiftUnsentMessage(){
		return this._messagesToSend.shift();
	}

	restoreFromMemento(memento) {
		if (memento.messagesList) {
			this._state = memento.messagesList;
		}
	}

	createMemento() {
		return {
			messagesList: this._state
		};
	}
}

var instance = new MessagesRepository();
export default instance;