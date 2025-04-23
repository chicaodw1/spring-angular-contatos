# 🖥️ Documentação Backend - Spring Boot

## 🔧 Tecnologias

- Java 17
- Spring Boot 3.4.4
- Spring Data JPA
- PostgreSQL
- HikariCP
- Spring Security + AWS Cognito

---

## 📁 Estrutura

```
src/
├── main/
│   ├── java/com/contactList/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   └── ContactManagerApplication.java
│   └── resources/
│       ├── application.properties
│       └── schema.sql
|── test/
```

---

## 📋 Funcionalidades

- **API RESTful** para operações de CRUD em contatos
- **Validação:** número de celular único
- **Inativação lógica:** campo `contato_sn_ativo` define se o contato está ativo
- **Favoritos:** campo `contato_sn_favorito`
- **Timestamp de criação automática**

---

## 🔐 Segurança

- Integração com AWS Cognito
- JWT token validado via Spring Security

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=${COGNITO_ISSUER_URI}
cognito.region=${COGNITO_REGION}
cognito.userPoolId=${COGNITO_USER_POOL}
cognito.clientId=${COGNITO_CLIENT_ID}
```

---

## 🧪 Testes

- Testes unitários com JUnit e Mockito
- Testes de repositórios, serviços e controllers

---

## 🔗 API Endpoints

```
GET    /api/contatos               -> Listar todos
GET    /api/contatos/{id}          -> Buscar por ID
POST   /api/contatos               -> Criar novo contato
PUT    /api/contatos/{id}          -> Editar contato
PATCH  /api/contatos/{id}/ativo    -> Inativar contato
PATCH  /api/contatos/{id}/favorito -> Marcar como favorito
GET    /api/Indicadores
```

---

## ⚙️ application.properties

```properties
spring.application.name=contactManager

# URL do banco PostgreSQL no RDS
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# JPA & Hibernate
spring.jpa.properties.hibernate.default_schema=desafio
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# CONFIG DO COGNITO
spring.security.oauth2.resourceserver.jwt.issuer-uri=${COGNITO_ISSUER_URI}
cognito.region=${COGNITO_REGION}
cognito.userPoolId=${COGNITO_USER_POOL}
cognito.clientId=${COGNITO_CLIENT_ID}
```

## 🚀 Como rodar o projeto

### ✅ Pré-requisitos

- Java 17+
- Maven
- PostgreSQL (ou acesso ao RDS configurado)
- Variáveis de ambiente configuradas:
  - `DB_URL`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `COGNITO_ISSUER_URI`
  - `COGNITO_REGION`
  - `COGNITO_USER_POOL`
  - `COGNITO_CLIENT_ID`

### ▶️ Passo a passo

1. **Clone o repositório**:

   ```bash
   git clone git@github.com:chicaodw1/spring-angular-contatos.git
   cd spring-angular-contatos/backend
   ```

2. **Configure as variáveis de ambiente** (Linux/macOS):

   ```bash
   export DB_URL=jdbc:postgresql://<HOST>:5432/<DATABASE>
   export DB_USERNAME=postgres
   export DB_PASSWORD=123contact12#
   export COGNITO_ISSUER_URI=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxx
   export COGNITO_REGION=us-east-1
   export COGNITO_USER_POOL=us-east-1_xxxxxxxx
   export COGNITO_CLIENT_ID=xxxxxxxxxxxxxx
   ```

3. **Compile e execute o projeto**:

   ```bash
   ./mvnw spring-boot:run
   ```

4. A API será disponibilizada em:  
   👉 http://localhost:8080/api/contatos

## 🧪 Como rodar os testes

Para executar os testes da aplicação backend, siga os passos abaixo:

### ✅ Pré-requisitos

- Java 17 instalado
- Maven instalado

### ▶️ Executar os testes com Maven

Abra o terminal na raiz do projeto e execute:

```bash
./mvnw test
```

## 🧪 Tipos de testes incluídos

- Testes de repositório: validações de acesso ao banco de dados

- Testes de serviço: validação da regra de negócio

- Testes de controller: testes de endpoints simulando requisições

```
src/test/java/com/contactList/contactManager/
├── config/
├── controller/
├── mapper/
├── service/
└── ContactMangerApplicationTests.java
```
