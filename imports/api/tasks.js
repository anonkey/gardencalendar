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
			date: new Date(),
			creator: this.userId,
		});
	},
	'tasks.remove'(taskId) {
		check(taskId, String);
		console.log(Tasks.find({ _id: taskId}));
		Tasks.remove(taskId);
	},
	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
		Tasks.update(taskId, { $set: {checked: setChecked } });
	},
});