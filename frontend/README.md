# 🌐 Documentação Frontend - Angular

## 🔧 Tecnologias e Ferramentas

- Angular 17+
- Bootstrap para layout responsivo
- Angular Router
- Guards de rota para proteger páginas privadas
- HttpClient para consumo das APIs REST

---

## 📂 Estrutura de Pastas

```
src/
├── app/
│   ├── components/
│   ├── guards/
│   ├── interceptore/
│   ├── models/
│   ├── pages/
│   ├── services/
│   └── app-routes.ts
└── environments/
└── styles/
```

---

## 🔐 Autenticação

- Autenticação com Cognito
- Uso de token JWT armazenado no localStorage
- Guardas de rota para proteger páginas autenticadas

---

## 📋 Funcionalidades

- **Cadastro de Contatos:** formulário com validação para celular único
- **Consulta de Contatos:** listagem com filtros e busca por nome/celular
- **Edição/Inativação:** alteração de dados e marcação como inativo
- **Favoritos:** botão de marcar/desmarcar contato como favorito
- **Responsividade:** layout adaptável

---

## 🧪 Testes

- Criados com Jasmine + Karma
- Testes básicos para componentes, serviços e pipes

---

## 🔐 Segurança

- `.gitignore` configurado para ignorar `environment.ts`
- `environment.ts` exemplo:

```ts
export const environment = {
  production: false,
  userPoolId: "...",
  userPoolClientId: "...",
  identityPoolId: "...",
};
```

## ▶️ Como Rodar o Projeto

### ✅ Pré-requisitos

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Git
- Editor de código (VSCode recomendado)

### 🚀 Passos para execução local

1. **Clone o repositório:**

```bash
git clone git@github.com:chicaodw1/spring-angular-contatos.git
cd spring-angular-contatos/frontend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o ambiente:**

Crie o arquivo `src/environments/environment.ts` com o seguinte conteúdo (substitua os valores reais):

```ts
export const environment = {
  production: false,
  userPoolId: "seu-user-pool-id",
  userPoolClientId: "seu-client-id",
  identityPoolId: "seu-identity-pool-id",
};
```

> ⚠️ Esse arquivo está no `.gitignore` e não será versionado.

4. **Rode o servidor de desenvolvimento:**

```bash
ng serve
```

5. **Acesse o app:**

Abra [http://localhost:4200](http://localhost:4200) no navegador.

---

## 🧪 Como Rodar os Testes

O projeto utiliza **Jasmine** e **Karma** para realizar os testes unitários.

### ✅ Pré-requisitos

- Ter as dependências instaladas com `npm install`
- Angular CLI instalado globalmente (`@angular/cli`)

### ▶️ Executando os testes

No terminal, dentro da pasta `frontend`, execute:

```bash
ng test
```

## 📦 Estrutura esperada dos testes

- Os testes ficam nos mesmos diretórios dos componentes, serviços ou pipes testados.

- O nome dos arquivos de teste seguem o padrão: \*.spec.ts

## 🧪 Tipos de testes incluídos

- Componentes: Testam a renderização e eventos dos componentes visuais.

- Serviços: Validam chamadas HTTP e lógica de negócio.
