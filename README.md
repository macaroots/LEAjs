# LEA - Live Environment for Agents
Multi-agent web framework

Ceeds oferecem habilidades básicas para NaiveAgents seguirem o ciclo de Clever Editing. Na prática, Ceeds são objetos dinâmicos que podem ler/escrever comportamentos em um banco de dados e perguntar ao usuário por métodos faltando. Ceeds conseguem viver sozinhos em um computador.

LEA é um ambiente nas nuvens para dar suporte ao desenvolvimento de agentes.

## Problema da definição de métodos no servidor (ask)
Os Ceeds do cliente conseguem perguntar ao usuário diretamente através do DOM. Os Ceeds do servidor não tem acesso ao DOM, portanto, devem enviar suas perguntas a um agente centralizador de perguntas do lado do servidor, um QuestionQueuer, talvez? Um agente Script no cliente poderia solicitar essas informações via Socket.io.

## Iniciando o servidor
Importando e iniciando o agente.
...
import {Ceed} from './public/_js/ceed/ceed.js';
import {} from './lib/lea.js';

const lea = await Ceed('LEA');
...

Iniciando o servidor apenas com a biblioteca local.
...
lea.see('listen', {
	hostname: '127.0.0.1', 
	port: 3000
});
...

Iniciando o servidor com biblioteca em MySQL.
...
lea.see('initBrain', {
	host: 'localhost',
	database: 'mind',
	user: 'root',
	password: ''
}).then(() => {
	lea.see('listen', {
		hostname: '127.0.0.1', 
		port: 3000
	});
});
...

Iniciando o servidor com biblioteca HTTP
...
lea.see('initHttpBrain', {
	host: 'http://localhost/brain/',
	protocol: 'http'
}).then(() => {
	lea.see('listen', {
		hostname: '127.0.0.1', 
		port: 3000
	});
});
...