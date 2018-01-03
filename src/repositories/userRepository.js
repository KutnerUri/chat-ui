function UserRepository() {
	var _cache = {};
	const _avatars = [
		"https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png",
		"https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png",
	];

	this.getUserAvatar = getUserAvatar;

	function getUserAvatar(userName) {
		if(_cache.hasOwnProperty(userName)){
			return _cache[userName];
		}

		var avatar = getRandomAvatar();
		_cache[userName] = avatar;
		return avatar;
	}

	function getRandomAvatar() {
		const randomAvatarIdx = Math.floor(Math.random() * _avatars.length);
		
		return _avatars[randomAvatarIdx];
	}
}

var repositoryInstance = new UserRepository();
export default repositoryInstance;