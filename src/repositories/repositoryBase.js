class RepositoryBase {
	constructor(name){
		this._storageName = name;

		this._subscribers = [];
	}


	//pub sub:
	subscribe(handler){
		this._subscribers.push(handler);
	}

	updateSubsribers() {
		this._subscribers.forEach(sub => sub());
	}


	//persistence:
	persisteState() {
		const memento = this.createMemento();
		window.localStorage[this._storageName] = JSON.stringify(memento);
	}

	restorePersistence() {
		if(!window.localStorage.hasOwnProperty(this._storageName)) return;
		
		const memento = JSON.parse(window.localStorage[this._storageName]);
		this.restoreFromMemento(memento);
	}

	restoreFromMemento(memento) {
		throw new Error("should implement restoreFromMemento at inheriting class");
	}

	createMemento() {
		throw new Error("should implement createMemento at inheriting class");
	}
}

export default RepositoryBase;