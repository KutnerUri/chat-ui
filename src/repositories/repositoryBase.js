class RepositoryBase {
	constructor(name){
		this.storageName = name;

		this.subscribers = [];
	}

	get(){
		throw new Error("should implement .get at inheriting class");		
	}

	//pub sub:
	subscribe(handler){
		this.subscribers.push(handler);
	}

	updateSubsribers() {
		const data = this.get();

		this.subscribers
			.forEach(sub => sub(data));
	}


	//persistence:
	persisteState() {
		const memento = this.createMemento();
		window.localStorage[this.storageName] = JSON.stringify(memento);
	}

	restorePersistence() {
		if(!window.localStorage.hasOwnProperty(this.storageName)) return;
		
		const memento = JSON.parse(window.localStorage[this.storageName]);
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