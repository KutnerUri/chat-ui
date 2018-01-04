export default class Message {
	constructor(username, text, id){
		this.username = username;
		this.text = text;
		this.id = id || generateUniqueId();

		function generateUniqueId(){
			var t = new Date().getTime();
			var r = Math.floor(Math.random() * 100000);
	
			return t + "" + r;
		}
	}
}