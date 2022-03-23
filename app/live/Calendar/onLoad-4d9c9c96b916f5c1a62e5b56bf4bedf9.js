new (function onLoad() {
	this.act = async function (args, resolve, reject) {
	    await new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
				dataType: "script",
				cache: true,
				success: function () {
				    resolve();
				}
			});
	    });
	    await new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: 'https://code.jquery.com/jquery-1.12.4.min.js',
				dataType: "script",
				cache: true,
				success: function () {
				    resolve();
				}
			});
	    });
	    await new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: 'https://www.jqueryscript.net/demo/Full-Size-Drag-Drop-Calendar-Plugin-FullCalendar/fullcalendar.min.js',
				dataType: "script",
				cache: true,
				success: function () {
				    resolve();
				}
			});
	    });
	    let calendar = $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
          },
          defaultDate: new Date().toISOString().slice(0, 10),
          navLinks: true, // can click day/week names to navigate views
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: await this.agent.see('getEvents')
        });
        
		resolve();
	};
})();