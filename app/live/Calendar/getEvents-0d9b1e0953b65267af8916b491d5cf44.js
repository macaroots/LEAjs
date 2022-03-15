new class getEvents {
	act(args, resolve, reject) {
	    let month = String(new Date(Date.now()).getMonth() + 1).padStart(2, '0');
		let events = [
            {
              title: 'Consulta 1',
              start: '2022-' + month + '-12T10:30:00',
              end: '2022-' + month + '-12T12:30:00'
            },
            {
              title: 'Consulta 2',
              start: '2022-' + month + '-12T12:00:00'
            },
            {
              title: 'Consulta 3',
              start: '2022-' + month + '-12T14:30:00'
            },
            {
              title: 'Consulta 4',
              start: '2022-' + month + '-12T17:30:00'
            },
            {
              title: 'Consulta 5',
              start: '2022-' + month + '-12T20:00:00'
            },
            {
              title: 'Consulta 6',
              start: '2022-' + month + '-13T07:00:00'
            },
            {
              title: 'Consulta 7',
              url: 'http://google.com/',
              start: '2022-' + month + '-28'
            }
        ];
		resolve(events);
	}
}();