function MessagesRepository() {
	var _cache = [];
	var _subscribers = [];

	this.subscribe = subscribe;
	this.add = add;

	function add(message) {
		_cache.push(message);

		updateAll();
	}

	function subscribe(onChange){
		_subscribers.push(onChange);

		update(onChange);
	}

	function updateAll() {
		_subscribers.forEach(update);
	}

	function update(subscriber){
		const snapshot = _cache.concat([]);		
		subscriber(snapshot);
	}
}

export default new MessagesRepository();