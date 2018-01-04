import RepositoryBase from '../repositories/repositoryBase';

export class InputRepository extends RepositoryBase {
	constructor(){
		super("inputRespoitory");

		this.restorePersistence();
	}

	setInput(input){
		this.state = input;

		this.persisteState();
	}

	getInput(){
		return this.state;
	}

	restoreFromMemento(memento){
		if(memento.input) this.state = memento.input;
	}

	createMemento(){
		return {
			input: this.state
		}
	}
}

var instance = new InputRepository();
export default instance;