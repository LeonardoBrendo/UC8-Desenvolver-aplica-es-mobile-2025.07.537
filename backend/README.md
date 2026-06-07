# CRUD de Pessoa — Node.js + MVC + PostgreSQL

API REST para gerenciar pessoas, construída com Node.js e Express seguindo o padrão arquitetural MVC com camadas de Service, Repository e Route.

---

## Estrutura do projeto

```
mvc-pessoa/
├── app.js                    → ponto de entrada, inicializa o servidor
├── package.json
├── banco.sql                 → script para criar o banco e a tabela
├── config/
│   ├── database.js           → conexão com o PostgreSQL (Pool)
│   ├── swagger.js            → configuração do swagger-jsdoc (schemas e metadados)
│   └── swagger-routes.js     → documentação JSDoc de cada endpoint
├── model/
│   └── PessoaModel.js        → representa a estrutura da entidade Pessoa
├── repository/
│   └── PessoaRepository.js   → queries SQL (sem ORM)
├── service/
│   └── PessoaService.js      → regras de negócio e validações
├── controller/
│   └── PessoaController.js   → trata requisições e respostas HTTP
└── route/
    └── PessoaRoute.js        → define os endpoints da API
```

---

## Fluxo das camadas

```
Cliente (Insomnia/Postman)
        ↓ requisição HTTP
     Route        → define qual método do Controller será chamado
        ↓
  Controller      → lê req, chama o Service, devolve res
        ↓
   Service        → valida dados e aplica regras de negócio
        ↓
  Repository      → executa as queries SQL no banco
        ↓
  PostgreSQL      → armazena e retorna os dados
```

---

## Endpoints da API

| Método | Rota           | Ação                     | Status de sucesso |
|--------|----------------|--------------------------|-------------------|
| GET    | /pessoas       | Lista todas as pessoas   | 200               |
| GET    | /pessoas/:id   | Busca uma pessoa por id  | 200               |
| POST   | /pessoas       | Cria uma nova pessoa     | 201               |
| PUT    | /pessoas/:id   | Atualiza uma pessoa      | 200               |
| DELETE | /pessoas/:id   | Remove uma pessoa        | 200               |

---

## Como executar

```bash
# 1. Criar banco e tabela no PostgreSQL
psql -U postgres -f banco.sql

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor
npm start
```

---

## Documentação Swagger

A API conta com documentação interativa gerada automaticamente via **Swagger UI**.

### Pacotes utilizados

| Pacote | Função |
|---|---|
| `swagger-jsdoc` | Gera a especificação OpenAPI 3.0 a partir de comentários JSDoc |
| `swagger-ui-express` | Serve a interface visual do Swagger no Express |

### Como acessar

Com o servidor rodando, abra no navegador:

```
http://localhost:3000/api-docs
```

### O que está documentado

Todos os 5 endpoints da API estão documentados com:

- Método HTTP e caminho
- Parâmetros de rota (`id`)
- Corpo da requisição com exemplo (POST e PUT)
- Todos os códigos de resposta possíveis (200, 201, 400, 404, 500)
- Schemas reutilizáveis: `Pessoa`, `PessoaInput` e `Erro`

### Arquivos relacionados

| Arquivo | Responsabilidade |
|---|---|
| `config/swagger.js` | Define metadados da API e os schemas de dados |
| `config/swagger-routes.js` | Contém os comentários JSDoc de cada endpoint |
| `app.js` | Registra a rota `/api-docs` com o middleware do Swagger UI |

---

## Exemplo de corpo para POST e PUT

```json
{
  "nome": "Ana Paula",
  "altura": 1.68,
  "profissao": "Engenheira",
  "idade": 30,
  "cidade": "São Paulo"
}
```

---

## Questões Teóricas

**1.** O que é uma API REST e qual é a diferença entre ela e uma API comum?

**2.** Quais são os principais métodos HTTP usados em uma API REST e o que cada um representa?

**3.** O que significa o padrão MVC? Descreva a responsabilidade de cada camada (Model, View e Controller).

**4.** Por que separamos a aplicação em camadas (Route, Controller, Service, Repository)? Qual é o benefício dessa separação?

**5.** O que é JSON e por que ele é o formato mais utilizado para troca de dados em APIs REST?

**6.** O que são os códigos de status HTTP? Explique o significado dos códigos 200, 201, 400, 404 e 500.

**7.** O que é o `async/await` em JavaScript e por que ele é necessário ao trabalhar com banco de dados?

**8.** O que é um Pool de conexões e por que ele é preferível a abrir uma conexão nova a cada requisição ao banco?

**9.** O que é SQL Injection e como o uso de parâmetros (`$1`, `$2`) no PostgreSQL protege a aplicação contra esse ataque?

**10.** Qual é a responsabilidade da camada Service? Por que as regras de negócio não devem ficar no Controller ou no Repository?

**11.** O que é o `req.body`, o `req.params` e o `req.query` no Express? Em quais situações cada um é utilizado?

**12.** O que é middleware no Express? Cite um exemplo de middleware presente neste projeto e explique sua função.

**13.** O que significa o `RETURNING *` em um comando SQL do PostgreSQL?

**14.** O que é o `module.exports` no Node.js e por que ele é necessário para conectar os arquivos do projeto?

**15.** Qual é a diferença entre os métodos HTTP PUT e PATCH? Quando é mais adequado usar cada um?

---

## Questões Práticas

**1.** Crie 3 CRUDs:
**1.1** CRUD 1: Carro: nome, valor, marca e modelo.
**1.2** CRUD 2: Casa: valor, numero, rua, bairro, cidade e estado.
**1.3** CRUD 3: Profissao: nome, salário, anos de experiência, cargo e especialidade.

**2.** Após cadastrar as pessoas, utilize a rota `GET /pessoas` para listar todas elas. O que é retornado? Em qual formato estão os dados?

**3.** Busque uma pessoa específica usando `GET /pessoas/:id`. Depois, tente buscar um id que não existe (por exemplo, id 9999). Quais são as diferenças nas respostas retornadas?

**4.** Atualize os dados de uma pessoa cadastrada usando `PUT /pessoas/:id`. Altere ao menos três atributos e confirme a atualização com um `GET /pessoas/:id`.

**5.** Delete uma pessoa com `DELETE /pessoas/:id` e em seguida tente deletar o mesmo id novamente. O que acontece na segunda tentativa? Qual é o status HTTP retornado?

**6.** Tente criar uma pessoa enviando um corpo JSON sem o campo `nome`. Qual mensagem de erro é retornada? Em qual camada essa validação está sendo feita?

**7.** Adicione um novo atributo chamado `email` à entidade Pessoa. Para isso, você precisará alterar: o banco de dados (SQL), o Model, o Repository, o Service e o Controller. Documente cada alteração feita.

**8.** Abra o arquivo `repository/PessoaRepository.js` e explique com suas próprias palavras o que acontece linha a linha no método `criar()`.

**9.** Crie uma nova rota `GET /pessoas/cidade/:cidade` que retorne todas as pessoas de uma determinada cidade. Implemente as alterações necessárias em todas as camadas (Route, Controller, Service e Repository).

**10.** O que acontece se você remover a linha `app.use(express.json())` do `app.js` e tentar fazer um `POST /pessoas`? Teste e explique o resultado.

**11.** Altere o método `atualizar` do Service para não permitir que a idade de uma pessoa seja maior que 120 anos. Teste o comportamento com uma requisição inválida.

**12.** Observe o método `buscarPorId` no Repository. Ele retorna `null` quando não encontra nada. Explique por que o Service lança um erro (`throw new Error`) ao receber esse `null`, em vez de simplesmente retornar `null` diretamente ao Controller.

**13.** Acesse o banco de dados PostgreSQL pelo terminal e execute manualmente um `SELECT * FROM pessoa`. Compare o resultado com o retorno da rota `GET /pessoas`. Os dados são os mesmos?

**14.** Crie uma rota `GET /pessoas/maiores-de/:idade` que retorne apenas pessoas com idade superior ao valor informado na URL. Implemente em todas as camadas necessárias.

**15.** Analise os códigos de status HTTP retornados por cada rota do projeto e preencha a tabela abaixo com base nos testes que você realizou:

| Rota              | Situação testada              | Status recebido |
|-------------------|-------------------------------|-----------------|
| POST /pessoas     | Dados válidos                 |                 |
| POST /pessoas     | Sem o campo nome              |                 |
| GET /pessoas/:id  | Id existente                  |                 |
| GET /pessoas/:id  | Id inexistente                |                 |
| PUT /pessoas/:id  | Id existente, dados válidos   |                 |
| DELETE /pessoas/:id | Id inexistente              |                 |
