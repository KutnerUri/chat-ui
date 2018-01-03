const _avatars = [
	"https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png",
]

var uniqueId = 0;

export default class Message {
	constructor(username, content){
		this.username = username;
		this.content = content;
		this.avatar = getRandomAvatar();
		this.id = uniqueId++;

		function getRandomAvatar() {
			const randomAvatarIdx = Math.floor(Math.random() * _avatars.length);
			
			return _avatars[randomAvatarIdx];
		}
	}

}