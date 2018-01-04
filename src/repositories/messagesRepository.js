function MessagesRepository() {
	var _cache = [];
	var _subscribers = [];
	const _storage = window.localStorage;

	this.subscribe = subscribe;
	this.add = add;
	this.get = get;

	function ctor(){
		restorePersistence();
	}
	ctor();

	function add(message) {
		_cache.push(message);
		persisteState();

		updateAll();
	}

	function get(params) {
		return _cache.concat([]);
	}

	function subscribe(onChange){
		_subscribers.push(onChange);
	}

	function updateAll() {
		_subscribers.forEach(sub => sub(get()));
	}

	/** persistence: **/
	function persisteState() {
		const memento = createMemento();
		_storage.messagesRepository = JSON.stringify(memento);
	}

	function restorePersistence() {
		if(!_storage.hasOwnProperty("messagesRepository")) return;
		
		const memento = JSON.parse(_storage.messagesRepository);
		restoreMemento(memento);
	}

	function restoreMemento(memento){
		if(memento.messagesList) {
			_cache = memento.messagesList;
		}
	}

	function createMemento() {
		return {
			messagesList: _cache
		};
	}
	/** end persistence: **/
}

export default new MessagesRepository();