export default class Message {
	constructor(username, content){
		this.username = username;
		this.content = content;
		this.id = generateUniqueId();

		function generateUniqueId(){
			var t = new Date().getTime();
			var r = Math.floor(Math.random() * 100000);
	
			return t + "" + r;
		}
	}
}