import RepositoryBase from './repositoryBase';

export class MessagesRepository extends RepositoryBase {
	constructor() {
		super("messagesRepository");
		this.restorePersistence();
		this._state = [];

		this.restorePersistence();
	}

	add(message) {
		this._state.push(message);

		this.persisteState();
		this.updateSubsribers();
	}

	get() {
		return this._state.concat([]);
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