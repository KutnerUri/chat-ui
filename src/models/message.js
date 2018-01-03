

var uniqueId = 0;

export default class Message {
	constructor(username, content){
		this.username = username;
		this.content = content;
		this.id = uniqueId++;
	}
}