import RepositoryBase from './repositoryBase';

const _avatars = [
	"https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png",
	"https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png",
];

export class UserRepository extends RepositoryBase {
	constructor(){
		super("userRepository");
		this._state = {};

		this.restorePersistence();
	}

	setLoggedinUser(username){
		this._state.loggedinUser = username;

		this.persisteState();
		this.updateSubscribers();
	}

	getLoggedinUser(){
		return this._state.loggedinUser;
	}

	getUserAvatar(userName) {
		if(this._state.hasOwnProperty(userName)){
			return this._state[userName];
		}

		var avatar = this.selectRandomAvatar();
		this.assignUserAvatar(userName, avatar);

		return avatar;
	}

	assignUserAvatar(userName, avatar) {
		this._state[userName] = avatar;
		this.persisteState();
	}

	selectRandomAvatar() {
		const randomAvatarIdx = Math.floor(Math.random() * _avatars.length);
		
		return _avatars[randomAvatarIdx];
	}

	restoreFromMemento(memento){
		if(memento.userAvatars)		this._state 				= memento.userAvatars;
		if(memento.loggedinUser)	this._state.loggedinUser	= memento.loggedinUser;
	}

	createMemento() {
		return {
			userAvatars: this._state,
			loggedinUser: this._state.loggedinUser
		};
	}
}

const instance = new UserRepository();
export default instance;