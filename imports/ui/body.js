import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './tasks.js';
import './login.js';
import './taskCalendar.js';
import './body.html';

Template.body.onCreated(() =>{
	Meteor.subscribe('tasks');
});


Template.body.helpers({
	formatDate(date) {
		console.log(date)
		return moment( date ).format( 'DD-MM-YYYY' );
	},
});

