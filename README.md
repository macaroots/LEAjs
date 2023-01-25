# LEA - Live Environment for Agents
LEA é um ambiente/framework nas nuvens para dar suporte à edição ao vivo de sistemas multi-agente/web.


# TL;DR;
Ceeds são sensores com apenas um método: ```see(acao, argumento)```, capaz de solicitar ações ao agente; devolve uma Promise.

A ação ```agent.see('set', [key, value])``` permite definir novas chaves e entre elas novas ações a serem executadas pelo agente. O comportamento ensinado para o agente caso ele não conheça a ação é perguntar a quem tiver ouvindo.

## Hello, world!

A Linha 3 chama o agente e se necessário cria um novo agente com o treinamento inicial para CleverEditing. As Linhas de 4 a 8 definem uma nova ação através da ação 'set', associando a chave 'ola' a uma ação. Um clique no botão "Olá, mundo!" (Linha 11) dispara a ação 'ola' definida. Um clique no botão "Nova ação" (Linha 12) dispara uma pergunta, já que a ação 'novaAcao' nunca foi definida.

```html
<script type="module">
    import {Ceed} from  '//localhost/_js/ceed/ceed.js';
    let agente = await Ceed('NovoAgente');
    agente.see('set', ['ola', new class {
        act(args, resolve, reject) {
            alert(this.agent + ' - Olá, ' + args);
        }
    }()]);
    window.agente = agente;
</script>
<button onclick="agente.see('ola', 'mundo');">Olá, mundo!</button>
<button onclick="agente.see('novaAcao', 'args');">Nova ação</button>
```

Olá, mundo! Nova ação

## Edição assistida por agentes - CleverEditing
A edição assistida por agentes (CleverEditing) permite descrever o algoritmo numa abordagem top-down interativa. Cada ação desconhecida o agente abre uma pergunta.

```html
<script>
    agente.see('set', ['topDown', new (function () {
        this.act = async function (args, resolve, reject) {
            let agent = this.agent;
            let r1 = await agent.see('passo1', args);
            let r2 = await agent.see('passo2', r1);
            let r3;
            if (await agent.see('teste', r2)) {
                r3 = await agent.see('alternativa1', r2);
            }
            else {
                r3 = await agent.see('alternativa2', r2);
            }
            alert(r3);
            resolve(r3);
        };
    })()]);
</script>
<button onclick="agente.see('topDown', 'mundo');">CleverEditing</button>
```

## Iniciando o servidor
Importando e iniciando o agente.
```javascript
import {Ceed} from './public/_js/ceed/ceed.js';
import {} from './lib/lea.js';

const lea = await Ceed('Front');
```

Adicionando biblioteca em MySQL.
```javascript
await lea.see('initBrain', {
	host: 'localhost',
	database: 'mind',
	user: 'root',
	password: ''
});
```

Adicionando biblioteca HTTP
```javascript
await lea.see('initHttpBrain', {
	host: 'http://localhost/brain/',
	protocol: 'http'
});
```

Adicionando biblioteca do Sistemas de Arquivos.
```javascript
import {FileBrain} from './public/_js/ceed/file_brain.js';
await lea.see('addLibrary', new FileBrain('./live'));
```

Iniciando o servidor.
```javascript
lea.see('listen', {
	hostname: '127.0.0.1', 
	port: 3000
});
```

# Instruções de uso
## Clonar repositório:
```
git clone https://github.com/macaroots/LEAjs.git
```

## Criar arquivo .env
```
touch .env
```

## Criar certificado auto-assinado para HTTPS
Dentro da pasta `certs/`:
```
openssl req -x509 -newkey rsa:4096 -keyout selfsigned.key -out selfsigned.crt -nodes -days 365 -subj "/CN=localhost/O=TIIA"
```

## Executar
No próprio computador:
```
node app.js
```

Pelo Docker:
```
docker-compose up
```

## Testar
No próprio computador:
```
npm test
```

Pelo Docker:
```
docker-compose run --rm lea npm test
```

## Acessar

```
http://localhost
```
