import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	Meteor.publish('tasks', function taskPublication() {
		return Tasks.find({});
	});
}

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);
		if (! this.userId)
			throw new Meteor.Error('not-authorized');
		Tasks.insert({
			text,
			start: new Date(),
			end: new Date(),
			creator: this.userId,
		});
	},
	'tasks.remove'(taskId) {
		check(taskId, String);
		const taskToRm = Tasks.findOne({ _id: taskId});
		if (this.userId && taskToRm && taskToRm.creator == this.userId)
			Tasks.remove(taskId);
		else
			throw new Meteor.Error('not-authorized');
	},
	'tasks.setChecked'(taskId, setChecked) {
		let tId;
		if (typeof(taskId) === "object" && taskId !== null)
			tId = taskId._str;
		else
			tId = taskId;
		check(tId, String);
		check(setChecked, Boolean);
		console.log(Tasks.find({}));
		const taskToCheck = Tasks.findOne({ _id: tId});
		if (this.userId && taskToCheck && ((! taskToCheck.checked) || taskToCheck.creator == this.userId))
			Tasks.update(tId, { $set: {checked: setChecked, finisher: this.userId} });
		else if (! this.userId)
			throw new Meteor.Error('not-logged');
		else if (! taskToCheck)
			throw new Meteor.Error('bad-id');
		else
			throw new Meteor.Error('not-authorized');
	},
});