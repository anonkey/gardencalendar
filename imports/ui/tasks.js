import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

import './login.js';
import './tasks.html';

Template.tasklist.onCreated(() => {
		const inst = Template.instance();
		console.log(inst);
	inst.state = new ReactiveDict();
});

Template.tasklist.helpers({
	tasks: function () {
		const inst = Template.instance();
		console.log(inst);
		console.log(inst.state.get('hide-comp-task'));
		if (inst.state.get('hide-comp-task')){
			return Tasks.find({ checked: { $ne: true } }, { sort: {date: -1} });
		}
		return Tasks.find({}, { sort: {date: -1} });
	},
	incompleteTasks: function () {
		return Tasks.find({ checked: { $ne: true } }, { sort: {date: -1} }).count();
	},
});

Template.tasklist.events({
	'change .hide-comp-task input'(event, instance) {
		instance.state.set('hide-comp-task', event.target.checked);
	},
	'submit .add-task'(event) {
		event.preventDefault();

		const target = event.target;
		const text = event.target.text.value;

		Meteor.call('tasks.insert', text);
		target.text.value = '';
	},
});

Template.task.helpers({
	formatDate: function (date) {
		return moment( date ).format( 'DD-MM-YYYY hh:mm:ss' );
	},
});

Template.task.events({
	'click .task-delete'() {
		Meteor.call('tasks.remove', this._id);
	},
	'click .toggle-checked'() {
		Meteor.call('tasks.setChecked', this._id, ! this.checked);
	},
});
