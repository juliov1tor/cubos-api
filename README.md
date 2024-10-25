# cubos-api

## Introdução

Este projeto é uma API construída para uma aplicação financeira, desenvolvida utilizando Node.js com o framework Express e Typescript. A Cubos se posiciona como um hub de conhecimento e inovação, especializada em tecnologia financeira, buscando implementar ideias que otimizam e inovam os serviços do sistema financeiro.

## Contexto

A aplicação foi desenvolvida como parte de um desafio técnico para construir uma API com funcionalidades essenciais de uma aplicação financeira. A API foi construída seguindo boas práticas, como o uso de migrations para o banco de dados PostgreSQL e a proteção das rotas utilizando Bearer Authentication.

## Tecnologias Utilizadas
- *Node.js: versão mínima recomendada **v18.x*.
- *Express*: Framework para construção de APIs.
- *Typescript*: Linguagem que adiciona tipagem estática ao JavaScript.
- *PostgreSQL*: Banco de dados relacional utilizado.
- *Prisma*: ORM para gerenciamento do banco de dados.
- *JWT*: Utilizado para autenticação no padrão Bearer Authentication.

## Funcionalidades

A aplicação possui as seguintes funcionalidades principais:

1. Criar uma pessoa.
2. Autenticar uma pessoa.
3. Adicionar e listar cartões de uma conta.
4. Adicionar e listar contas da pessoa.
5. Realizar e listar transações em uma conta.
6. Consultar o saldo de uma conta.
7. Reverter uma transação.

## Endpoints

Os detalhes dos endpoints e seus respectivos requisitos estão documentados no arquivo localizado em /artifacts. Certifique-se de seguir os padrões de request e response definidos no contrato de rotas.

## Testes

Testes de integração e/ou unitários são obrigatórios para garantir o correto funcionamento da aplicação e a cobertura das principais funcionalidades.

## Entrega

Após o desenvolvimento, a entrega deve ser realizada via repositório no GitHub, contendo todas as instruções necessárias para executar a aplicação. Caso o repositório seja privado, solicite as contas que devem ter acesso para correção.

## Localização dos Artefatos

O arquivo do Postman contendo todos os endpoints necessários para a execução dos testes pode ser encontrado no diretório /artifacts.

## Execução

Para executar o projeto localmente, siga os passos abaixo:

1. Instale as dependências:
   `npm install`
   

2. Renomeie o arquivo .env.example para .env e configure as variáveis necessárias, preenchendo os campos de acesso conforme abaixo:

   Lembre-se de substituir "seulogin@email.com" e "suasenha" pelos seus dados de acesso reais.

3. Execute a aplicação:
   `npm start`
   

4. Para compilar o projeto:
   `npm run build`
    

Essas etapas garantirão que a aplicação esteja configurada corretamente para rodar em seu ambiente local.
## Autor

Julio Cesar Vitor  

---

Este projeto foi criado com o objetivo de demonstrar as principais habilidades e boas práticas no desenvolvimento de APIs financeiras.