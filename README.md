# Desafio Técnico Backend NodeJS (**Green Acesso**)

Sistema Backend em typescript que faz a população de dados através de um arquivo csv, separa boletos em pdf para cada cliente e gera relatórios.

[TOC]

## Principais Bibliotecas utilizadas

*Nodejs Versão 19.9 ou superior*

	Express
	Pdf-lib
	CSV
	Multer
	Jest
	Prisma (ORM)


## Comandos para execução

_Antes renomeie e preencha o arquivo .env.example_

Migração do banco de dados.

```bash
npx prisma migrate dev
```

Testes

```bash
npm run test
```

Execução

```bash
npm run start
```


## Uso

Os arquivos necessários se encontram na pasta /assets

https://github.com/rafa-carmo/green-acesso/tree/main/assets

### Endpoints

*Upload de CSV*

	Methodo: POST
	key: file

	http://localhost:4000/upload_csv


_Upload PDF_

	Methodo: POST
	key: file

	http://localhost:4000/upload_pdf

_Listagem de dados_

*Parâmetros Opcionais*

	Methodo: GET
	nome: String
	valor_inicial: Number
	valor_final: Number
	id_lote: Number
	relatorio: 1 //Para gerar relatorio em pdf

	http://localhost:4000/boletos


O Relatório salva na pasta relatórios com a data atual

## Agradecimentos

Agradeço sinceramente pela oportunidade de participar do desafio técnico. Foi um prazer desafiar minhas habilidades e conhecimentos para resolver os problemas propostos.