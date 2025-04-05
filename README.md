
# 📘 Documentação Geral - Sistema de Contatos

Este projeto tem como objetivo o desenvolvimento de um sistema de gerenciamento de contatos com as funcionalidades de cadastro, edição, inativação, favoritos, listagem, busca e proteção de rotas.

---

## 🔧 Tecnologias Utilizadas

### Frontend
- Angular (versão mais recente)
- Bootstrap
- Typescript
- Guards para proteção de rotas

### Backend
- Java 17
- Spring Boot 3.4.4
- Spring Data JPA
- PostgreSQL (AWS RDS)
- HikariCP
- AWS Cognito para autenticação

---

## 🛠 Estrutura do Projeto

```
spring-angular-contatos/
│
├── backend/
│   ├── src/main/java/com/contactList/
│   └── src/main/resources/
│
└── frontend/
    ├── src/app/
    └── src/environments/
```

---

## ✅ Funcionalidades Gerais

- Cadastro de contato com validação de número de celular único
- Edição e inativação de contatos
- Busca e listagem de contatos
- Marcar contato como favorito
- Proteção de rotas com autenticação
- Comunicação entre frontend e backend via API REST
- Testes unitários implementados

---

## 🧪 Testes

- Backend: Testes com JUnit
- Frontend: Testes com Jasmine/Karma

---

## 🧱 Banco de Dados

```sql
CREATE SCHEMA desafio;

CREATE TABLE desafio.contato (
  contato_id SERIAL PRIMARY KEY,
  contato_nome VARCHAR(100),
  contato_email VARCHAR(255),
  contato_celular VARCHAR(11),
  contato_telefone VARCHAR(10),
  contato_sn_favorito CHARACTER(1),
  contato_sn_ativo CHARACTER(1),
  contato_dh_cad TIMESTAMP WITHOUT TIME ZONE
);
```

---

## 🔐 Segurança

- Variáveis de ambiente protegidas via `.gitignore`
- Integração com AWS Cognito
- Uso de tokens JWT
