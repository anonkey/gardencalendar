import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './tasks.js';
import './tasks.html';
import './body.html';

Template.body.helpers({
	formatDate(date) {
		console.log(date)
		return moment( date ).format( 'DD-MM-YYYY' );
	},
});

