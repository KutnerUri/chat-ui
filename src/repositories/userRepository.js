function UserRepository() {
	this.getUserAvatar = getUserAvatar;

	var _cache = {};
	const _storage = window.localStorage;
	const _avatars = [
		"https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png",
	];

	function ctor(){
		restorePersistence();
	}
	ctor();

	function getUserAvatar(userName) {
		if(_cache.hasOwnProperty(userName)){
			return _cache[userName];
		}

		var avatar = getRandomAvatar();
		assignUserAvatar(userName, avatar);

		return avatar;
	}

	function assignUserAvatar(userName, avatar) {
		_cache[userName] = avatar;
		persisteState();
	}

	function getRandomAvatar() {
		const randomAvatarIdx = Math.floor(Math.random() * _avatars.length);
		
		return _avatars[randomAvatarIdx];
	}

	/** persistence: **/
	function persisteState() {
		const memento = createMemento();
		_storage.userRepository = JSON.stringify(memento);
	}

	function restorePersistence() {
		if(!_storage.hasOwnProperty("userRepository")) return;
		
		const memento = JSON.parse(_storage.userRepository);
		restoreMemento(memento);
	}

	function restoreMemento(memento){
		if(memento.userAvatars) {
			_cache = memento.userAvatars;
		}
	}

	function createMemento() {
		return {
			userAvatars: _cache
		};
	}
	/** end persistence: **/
}

var repositoryInstance = new UserRepository();
export default repositoryInstance;