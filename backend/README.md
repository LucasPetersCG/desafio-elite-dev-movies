# Elite Dev Movies - Desafio de Lista de Filmes

Uma aplicação web full-stack criada como solução para o desafio técnico "Elite Dev". O projeto permite aos usuários pesquisar filmes utilizando a API do The Movie Database (TMDb), gerenciar uma lista de favoritos e compartilhar essa lista através de um link exclusivo.

![Screenshot da Aplicação](./screenshot.png)

### Links Vivos
*   **Aplicação Front-End (Vercel):** `[https://desafio-elite-dev-movies.vercel.app]`
*   **API Back-End (Render):** `[https://desafio-elite-dev-movies-api.onrender.com]`

---

## 📋 Tabela de Conteúdos

1.  [Funcionalidades](#-funcionalidades)
2.  [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3.  [Como Executar o Projeto Localmente](#️-como-executar-o-projeto-localmente)
4.  [Estrutura do Projeto](#-estrutura-do-projeto)
5.  [Endpoints da API](#-endpoints-da-api)
6.  [Decisões de Design e Observações](#-decisões-de-design-e-observações)

---

## ✨ Funcionalidades

-   **Pesquisa de Filmes:** Busca dinâmica e em tempo real na API do TMDb.
-   **Detalhes Visuais:** Exibição de pôster, título, nota (rating) destacada, data de lançamento e sinopse para cada filme.
-   **Gerenciamento de Favoritos:** Adicione ou remova filmes de uma lista de favoritos que persiste no banco de dados.
-   **Compartilhamento de Lista:** Geração de um link único que exibe uma lista de favoritos para qualquer pessoa.
-   **Design Responsivo:** Interface adaptável para uma experiência de uso otimizada em desktops e dispositivos móveis.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e robusto, separado em dois serviços principais:

#### **Front-End**
-   **Framework:** React (com Vite)
-   **Roteamento:** React Router DOM
-   **Estilização:** Styled-Components e CSS global.
-   **Cliente HTTP:** Axios
-   **Deploy:** Vercel

#### **Back-End**
-   **Linguagem:** Python 3
-   **Framework:** Django & Django REST Framework
-   **Banco de Dados:** PostgreSQL
-   **Servidor WSGI:** Gunicorn
-   **Deploy:** Render

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos
-   **Node.js** (versão 18 ou superior)
-   **Python** (versão 3.10 ou superior)
-   **PostgreSQL** instalado e um servidor rodando.

### 1. Configuração do Back-End (API Django)

```bash
# Clone o repositório
git clone https://github.com/LucasPetersCG/desafio-elite-dev-movies
cd desafio-elite-dev-movies

# Navegue para a pasta do backend
cd backend

# Crie e ative um ambiente virtual
python -m venv venv
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Configure o Banco de Dados
# - Certifique-se de que o PostgreSQL está rodando.
# - Crie um novo banco de dados. Ex: CREATE DATABASE movie_list_db;

# Configure as Variáveis de Ambiente
# - Crie um arquivo .env na raiz da pasta do backend.
# - Adicione as seguintes variáveis, substituindo pelos seus valores:
TMDB_API_KEY=sua_chave_secreta_do_tmdb
DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/movie_list_db

# Aplique as migrações do banco de dados
python manage.py migrate

# Inicie o servidor
python manage.py runserver
```
> ✅ O backend estará rodando em `http://127.0.0.1:8000`.

### 2. Configuração do Front-End (App React)

```bash
# Abra um NOVO terminal e navegue para a pasta raiz do projeto
cd caminho/para/desafio-elite-dev-movies

# Navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Configure as Variáveis de Ambiente
# - Crie um arquivo .env na raiz da pasta do frontend.
# - Adicione a URL da sua API local:
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# Inicie o servidor de desenvolvimento
npm run dev
```
> ✅ A aplicação estará acessível em `http://localhost:5173`.

---

## 📁 Estrutura do Projeto

O repositório está organizado em duas pastas principais, `backend` e `frontend`, representando a separação clara entre os serviços para facilitar a manutenção e o deploy independente.

-   **`/backend`**: Contém a aplicação Django. O app `movies` é responsável por toda a lógica de API, modelos e comunicação com o banco de dados.
-   **`/frontend`**: Contém a aplicação React, estruturada com pastas para `components` (reutilizáveis), `pages` (visualizações de rota) e `services` (lógica de comunicação com a API).

---

## 🌐 Endpoints da API

A API do backend expõe os seguintes endpoints principais:

| Método | URL                          | Descrição                                         |
| :----- | :--------------------------- | :------------------------------------------------ |
| `GET`  | `/api/search/?query={termo}` | Busca filmes na API do TMDb.                      |
| `GET`  | `/api/favorites/`            | Retorna a lista de todos os filmes favoritos.     |
| `POST` | `/api/favorites/`            | Adiciona um novo filme à lista de favoritos.      |
| `DELETE`| `/api/favorites/{tmdb_id}/`  | Remove um filme da lista de favoritos.            |
| `GET`  | `/api/favorites/share/`      | Gera o link parcial de compartilhamento.          |
| `GET`  | `/api/movies-by-ids/?ids={ids}` | Retorna os detalhes de múltiplos filmes por seus IDs. |

---

## 📝 Decisões de Design e Observações

-   **Centralização de Estilos:** Optei por usar uma combinação de um arquivo CSS global (`App.css`) para o layout principal e a biblioteca `Styled-Components` para estilização de elementos específicos e isolados, como os do `MovieCard`, buscando um balanço entre organização global e componentização.
-   **Compartilhamento Eficiente:** A rota de compartilhamento foi implementada com um endpoint dedicado no backend (`/api/movies-by-ids/`) para evitar múltiplas chamadas de API no frontend, tornando o carregamento da lista compartilhada mais rápido e eficiente.
-   **Desafio de Deploy:** Durante o deploy no Render, encontrei uma limitação do plano gratuito que não permite a execução de comandos `migrate` via shell. Para contornar essa restrição, conectei meu ambiente local ao banco de dados de produção para aplicar as migrações de forma segura, garantindo a inicialização correta do banco.
-   **Versionamento:** O histórico de commits foi mantido de forma organizada, seguindo padrões semânticos (`feat`, `fix`, `style`, `docs`) para facilitar a compreensão da evolução do projeto.

---

## 👨‍💻 Autor

- **Lucas Peters Cremasco Gonçalves**
- **GitHub:** [@LucasPetersCG](https://github.com/LucasPetersCG)
- **LinkedIn:** `[www.linkedin.com/in/lucas-peters-cg]`