import RepositoryBase from '../repositories/repositoryBase';

describe('RepositoryBase tests', function() {
	var _target;
	beforeEach(function(){
		_target = new RepositoryBase("repositoryName");
	})	

	it("updateSubscribers() should call subsribers, when there is one subsriber", function() {
		var sub1 = jest.fn();
		_target.subscribe(sub1);

		_target.updateSubscribers();
		expect(sub1).toHaveBeenCalledTimes(1);
	});

	it("updateSubscribers() should not throw, when there are no subsribers", function() {
		expect(() => _target.updateSubscribers()).not.toThrow();
	});

	it("updateSubscribers() should call all subsribers, when there are two subsribers", function() {
		var sub1 = jest.fn(), sub2 = jest.fn();
		_target.subscribe(sub1);
		_target.subscribe(sub2);

		_target.updateSubscribers();
		expect(sub1).toHaveBeenCalledTimes(1);
		expect(sub2).toHaveBeenCalledTimes(1);
	});

	it("subscribe() should not call subsribers", function() {
		var sub1 = jest.fn();
		_target.subscribe(sub1);

		expect(sub1).not.toHaveBeenCalled();
	});
});