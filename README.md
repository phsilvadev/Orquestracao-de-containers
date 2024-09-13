# Morena Eventos

## Indice

- [1. Visão Geral]()
- [2. Arquitetura da Aplicação]()
  - [2.1 Frontend (React com Next.js)]()
  - [2.2 Backend (Laravel)]()
  - [2.3 Banco de Dados (PostgreSQL)]()
- [3. Tecnologias Utilizadas]()
- [4. Fluxo de Trabalho]()
- [6. Configuração do Ambiente]()
  - [6.1 Com Docker]()
  - [6.2 sem Docker]()

## 1. Visão Geral

"Morena Evento" é uma aplicação desenvolvida para gerenciar eventos, fornecendo uma interface para usuários criarem, visualizarem e gerenciarem eventos, com um backend em Laravel e no frontend React.js - Next.js.

## 2. Arquitetura de Aplicação

### 2.1 Frontend (React com Next.js)

- Descrição do uso de Next.js como framework frontend para renderização SSR e SSG.

### 2.2 Backend (Laravel)

- Descrição do uso de Laravel para a criação da API backend.

### 2.3 Banco de Dados (PostgreSQL)

- Explicação sobre o uso do PostgreSQL para armazenar dados de eventos, usuários, etc.

## Tecnologias Utilizadas

- Listagem das principais tecnologias:

  - React com Next.js para o frontend.
  - Laravel para o backend.
  - PostgreSQL para o banco de dados.
  - Node.js & Composer para execução de scripts e gerenciamento de dependências.
  - Docker (opcional) para containers.

## 4. Fluxo de trabalho

### 1. Página Inicial (Listagem de Eventos):

- **Requisição (GET):** Ao carregar a página inicial, o frontend envia uma requisição ao backend para obter todos os eventos elegíveis.

  - **Endpoint:** `/api/events`
  - **Response:** O backend retorna uma lista de eventos que estão abertos para inscrição, incluindo detalhes como data, local, descrição, capacidade e se o usuário já está inscrito.

### 2. Autenticação do Usuário:

- O usuário precisa estar logado para realizar ações como se inscrever em eventos ou gerenciar os próprios eventos.

**Requisição (POST):** Autenticação via API, onde o usuário envia suas credenciais para o backend.

- **Endpoint:** `/api/auth/login`
- **Response:** O backend retorna um token de autenticação (JWT ou sessão) que será utilizado nas próximas requisições.

### 3. Inscrição em um Evento:

**Requisição (POST):** O usuário, após autenticado, pode se inscrever em um evento. O backend deve garantir que o usuário não está inscrito em dois eventos no mesmo período.

- **Endpoint:** `/api/event/singUp`

- **Verificação:** O backend verifica se o usuário está disponível (não inscrito em outro evento no mesmo horário) antes de concluir a inscrição.

- **Response:** Confirmação da inscrição ou erro se houver conflito.

### 4. Gerenciamento de Eventos (Criar, Editar, Excluir):

- Apenas usuários logados podem criar, editar ou excluir eventos, e só podem gerenciar eventos que eles mesmos criaram.

**a. Criar Evento:**

- **Requisição (POST):** O usuário pode criar um evento. O backend automaticamente inscreve o criador no evento.

  - **Endpoint:** `/api/event/creatingEvent`

  - **Request Body:** Informações do evento (nome, data, local, etc.)

  - **Response:** Evento criado com sucesso, incluindo o ID e a inscrição automática do criador.

**b. Editar Evento:**

- **Requisição (PUT):** O usuário pode editar apenas eventos que ele criou.

  - **Endpoint:** `/api/events/edit/{event_id}`

  - **Verificação:** O backend verifica se o evento foi criado pelo usuário autenticado.

  - **Response:** Atualização confirmada ou erro se o usuário não for o dono do evento.

**c. Excluir Evento:**

- **Requisição (DELETE):** O usuário pode excluir apenas eventos que ele criou.

  - **Endpoint:** `/api/events/remove`
  - **Verificação:** O backend verifica se o evento foi criado pelo usuário autenticado.
  - **Response:** Confirmação de exclusão ou erro se o usuário não for o dono do evento.

## 6. Configuração do Ambiente

### 6.1 Com Docker (RECOMENDADO)

- Ferramentas Necessárias:
  - Docker
  - Docker Compose

**Passos de Configuração:**

- **Clone do Repositório:**

        https://github.com/phsilvadev/Desafio-Studio-Mozak-Morena-Eventos.git

- **Configuração de Arquivos:**

  - Criar ou modificar o arquivo `.env` com as variáveis necessárias para o ambiente Docker.

  - **Exemplo:**

    ```bash
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=databases
    DB_USERNAME=morena
    DB_PASSWORD=morenaapi
    ```

    **Observação:** Certifique-se de que o valor de **DB_HOST** corresponde exatamente ao nome do serviço de banco de dados definido no seu arquivo docker-compose.yml. Por exemplo, se no docker-compose.yml o serviço do PostgreSQL é definido como db, o valor de **DB_HOST** deve ser db.

- **Configure o docker-compose.yml:**

  Certifique-se de que o docker-compose.yml está configurado com as mesmas informação variáveis de ambiente.

  ```bash
  ...

  services:
      db:
      image: postgres
      environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
      ports:
          - '5498:5432'
  ...
  ```

### Configuração com Docker

A aplicação utiliza Docker e Docker Compose para rodar os serviços, incluindo o Node.js e o PostgreSQL. Siga as instruções abaixo para configurar e iniciar os containers.

**1. Instalar Docker**

- Acesse o [site do Docker](https://docs.docker.com/get-started/get-docker/) e baixe o mesmo conforme o seu sistema operacional

- Siga as instruções de instalação fornecidas no site.

**2. Iniciar o Docker Compose**

- Navegue até o diretório do projeto onde está localizado o arquivo docker-compose.yml e execute o comando:

```bash
docker-compose up --build
```

Este comando irá construir as imagens e buildar e iniciar os containers definidos no arquivo docker-compose.yml.

**3. Verificar os Containers em Execução**

- Após a execução do Docker Compose, você pode verificar os containers em execução com:

```bash
docker ps
```

**4. Migrar o Banco de Dados:**

- Linux:

  ```bash
  sudo docker exec -it morena_server php artisan migrate
  ```

- Windows

  ```bash
  docker exec -it morena_server php artisan migrate
  ```

**5. Criando seed no Banco de Dados:**

- linux:

  ```bash
  sudo docker exec -it morena_server php artisan db:seed
  ```

- Windows:

  ```bash
  docker exec -it morena_server php artisan db:seed
  ```

**6. Defina a chave secreta no arquivo `.env`**
O JWTAuth usa uma chave secreta que deve ser definida no arquivo .env da sua aplicação Laravel. Adicione a seguinte linha ao seu arquivo .env, substituindo your-secret-key por uma chave secreta segura:

```bash
JWT_SECRET=your-secret-key
```

- **Gere uma nova chave secreta**

  Se você ainda não tem uma chave secreta ou deseja gerar uma nova, você pode usar o comando Artisan para gerá-la automaticamente. Execute o seguinte comando:

  - Linux
    ```bash
    sudo docker exec -it morena_server php artisan jwt:secret
    ```
  - Windows
    ```bash
    docker exec -it morena_server php artisan jwt:secret
    ```

  **7. Limpe o cache de configuração**

  - Linux
    ```bash
    sudo docker exec -it morena_server php artisan config:cache
    ```
  - Windows
    ```bash
    docker exec -it morena_server php artisan config:cache
    ```

  **8. Reinicar o servidor caso necessario**

  - Linux
    ```bash
      sudo docker exec -it morena_server php artisan config:cache
    ```
  - Windows
    ```bash
    docker exec -it morena_server php artisan config:cache
    ```

  **9. Reinicie os serviços (se necessário)**
  Se você estiver usando Docker ou qualquer outro ambiente que precise reiniciar serviços para aplicar mudanças, faça isso:

  - Linux
    ```bash
    sudo docker-compose restart
    ```
  - Windows
    ```bash
    docker-compose restart
    ```

## AVISO!! Todos os comandos informados acima servem tanto para o Docker quanto para ambientes que não utilizam Docker.

### 6.2 Sem Docker

- **Ferramentas Necessárias:**
  - Node.js
  - PostgreSQL
  - PHP
  - Composer

**Passos de Configuração:**

1. **Clone do Repositório:**

   ```bash
   https://github.com/phsilvadev/Desafio-Studio-Mozak-Morena-Eventos.git
   ```

2. **- Instale e configure o [PostgreSQL](https://www.postgresql.org/download/) e [PgAdmin](https://www.pgadmin.org/download/) localmente.**

3. **Configuração de Arquivos:**

   - Criar ou modificar o arquivo `.env` com as configurações do banco de dados:

     ```bash
     DB_CONNECTION=pgsql
     DB_HOST=127.0.0.1
     DB_PORT=5432
     DB_DATABASE=databases
     DB_USERNAME=morena
     DB_PASSWORD=morenaapi

     ```

4. **Instalar Dependências:**

   - Backend (Laravel):

     ```bash
     composer install
     ```

   - Frontend (React com Next.js):

     ```bash
     cd frontend
     npm install
     ```

   - Migrar o Banco de Dados:

     ```bash
     php artisan migrate
     ```

5. **Iniciar o Servidor:**

   - Backend (Laravel)

     ```bash
     php artisan serve
     ```

   - Frontend (React com Next.js)

     ```bash
     npm run dev
     ```

6. **Acessar a Aplicação:**

- A aplicação será acessível em `http://localhost:3000` (React com Next.js) e ` http://localhost:8000` (Laravel API).
