# nest-task-manager

**nest-task-manager** é uma aplicação desenvolvida em TypeScript utilizando o framework NestJS para gerenciar tarefas de forma eficiente. Este projeto fornece uma API RESTful para criar, atualizar, listar e excluir tarefas, garantindo a segurança das operações através de autenticação JWT (JSON Web Token).

## Tecnologias Utilizadas

- **TypeScript**
- **NestJS**
  - Nest CLI
  - Módulo HTTP
  - Módulo de Autenticação
- **JWT** (JSON Web Token) para autenticação
- **TypeORM** para interação com o banco de dados
- **Swagger** para documentação da API

## Funcionalidades
1. **Gerenciamento de Projetos**
   - Criar um novo projeto
   - Listar todos os projetos
   - Atualizar um projeto
   - Excluir um projeto

2. **Gerenciamento de Tarefas**
   - Criar uma nova tarefa
   - Listar todas as tarefas
   - Atualizar uma tarefa existente
   - Excluir uma tarefa

3. **Autenticação e Autorização**
   - Registro de novos usuários
   - Login de usuários existentes
   - Proteção de rotas utilizando JWT

## Segurança com JWT

A aplicação utiliza o JSON Web Token (JWT) para autenticação e autorização dos usuários. O fluxo de autenticação é o seguinte:

1. **Registro e Login**
   - O usuário se registra fornecendo credenciais como nome de usuário e senha.
   - Ao fazer login, a aplicação valida as credenciais e, se corretas, gera um token JWT assinado com uma chave secreta.

2. **Proteção de Rotas**
   - Rotas que requerem autenticação são protegidas por Guards que verificam a presença e validade do token JWT no cabeçalho da requisição.
   - O token é validado utilizando a estratégia JWT do Passport, garantindo que apenas usuários autenticados possam acessar essas rotas.

3. **Validade do Token**
   - O token JWT possui um tempo de expiração definido, após o qual o usuário precisa realizar um novo login para obter um token válido.

Para mais detalhes sobre a implementação da autenticação JWT no NestJS, consulte a [documentação oficial](https://docs.nestjs.com/security/authentication).

## Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LeonardoSilva-code/nest-task-manager.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd nest-task-manager
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute a aplicação:**
   ```bash
   npm run start:dev
   ```

5. **Acesse a API:**
   - Documentação Swagger: [http://localhost:3000/swagger-ui.html](http://localhost:3000/swagger-ui.html)
   - API Base URL: [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```plaintext
src
├── auth
│   ├── auth.controller.ts       # Controlador de autenticação
│   ├── auth.module.ts           # Módulo de autenticação
│   ├── auth.dto.ts              # DTOs de autenticação
│   ├── auth.service.ts          # Serviço de autenticação
│   ├── constants.ts             # Constantes JWT
│   └── auth.guard.ts            # Guard para proteger rotas com JWT
├── projects
│   ├── dto                      # DTOs de projects
│   ├── entities                 # Entidades do banco de dados
│   ├── mapper                   # Mapper para converter os objetos
│   ├── tasks.controller.ts      # Controlador de projetos
│   ├── tasks.module.ts          # Módulo de projetos
│   ├── tasks.service.ts         # Serviço de projetos
├── tasks
│   ├── dto                      # DTOs de task
│   ├── entities                 # Entidades do banco de dados
│   ├── mapper                   # Mapper para converter os objetos
│   ├── tasks.controller.ts      # Controlador de tarefas
│   ├── tasks.module.ts          # Módulo de tarefas
│   ├── tasks.service.ts         # Serviço de tarefas
├── users
│   ├── dto                      # DTOs de users
│   ├── entities                 # Entidades do banco de dados
│   ├── mapper                   # Mapper para converter os objetos
│   ├── users.controller.ts      # Controlador de usuários
│   ├── users.module.ts          # Módulo de usuários
│   ├── users.service.ts         # Serviço de usuários
│   └── user.entity.ts           # Entidade de usuário para TypeORM
├── app.module.ts                # Módulo raiz da aplicação
└── main.ts                      # Ponto de entrada da aplicação
```

## Documentação da API

A documentação da API é gerada automaticamente pelo Swagger e pode ser acessada em [http://localhost:3000/api](http://localhost:3000/api) após iniciar a aplicação.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

Desenvolvido por Leonardo Silva. 