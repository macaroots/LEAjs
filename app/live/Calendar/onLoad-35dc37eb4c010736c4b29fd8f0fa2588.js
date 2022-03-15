new (function onLoad() {
	this.act = async function (args, resolve, reject) {
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