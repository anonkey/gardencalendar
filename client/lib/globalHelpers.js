
import { Template } from 'meteor/templating';

Template.registerHelper('formatDate', (date) => {
	console.log(date)
	return moment( date ).format( 'DD-MM-YYYY' );
});
