import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
//import { Calendar } from 'meteor/rzymek:fullcalendar';
import "./tasks.js";
import "./taskCalendar.html";

Template.taskCalendar.onCreated(() =>{
	Meteor.subscribe('tasks');
});

Template.taskCalendar.helpers({
	calendarOptions: function () {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
	console.log("calendar");
	return {
	    editable: true,
        header: {
            left: 'title',
            center: '',
            right: 'today prev,next'
        },
        height: 300,
		events: function (start, end, timezone, callback) {
	console.log(start, end);
			let eventarray = [];
			const tasklist =  Tasks.find({ 
//				start: { $gte: start },
//				end: { $lte: end },
			});
	console.log("taskcount");
			console.log(tasklist.count());
			tasklist.forEach(function(taskData) {
					var tmpEvent = {title: taskData.text, 
						start: taskData.start,
						end: taskData.end,
						allDay: true,
					}

			console.log(tmpEvent);
					eventarray.push(tmpEvent);
			});
			console.log(eventarray);
			callback(eventarray);
		},

   //     events: [{
   //         title: 'Meeting',
   //         start: new Date(y, m, d, 10, 30),
   //         allDay: false
   //     }, {
   //         title: 'Birthday Party',
   //         start: new Date(y, m, d + 1, 19, 0),
   //         end: new Date(y, m, d + 1, 22, 30),
   //         allDay: false
   //     }],
	};
	}
});


