import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './tasks.html';

Template.tasklist.helpers({
	tasks: function () {
		return Tasks.find({}, { sort: {date: -1} });
	},
});

Template.tasklist.events({
	'submit .add-task'(event) {
		event.preventDefault();

		const target = event.target;
		const text = event.target.text.value;

		console.log(Tasks.insert({
			text,
			date: new Date(),
		}));

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
		Tasks.remove(this._id);
	},
	'click .toggle-checked'() {
		Tasks.update(this._id, {
			$set: {checked: ! this.checked },
		});
	},
});
