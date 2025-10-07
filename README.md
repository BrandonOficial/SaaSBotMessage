# Pointer AI - Automação Inteligente para Atendimento

![Prévia do Dashboard](brandonoficial/saasbotmessage/SaaSBotMessage-4734558d1dfdc0c9c15642786578aa51ef35987b/public/images/dashboard-preview.png)

## 🚀 Sobre o Projeto

O **Pointer AI** é uma plataforma de Software as a Service (SaaS) projetada para escalar a geração de leads e o atendimento ao cliente através de automação inteligente. A aplicação permite a criação e gerenciamento de bots de mensagens que capturam, qualificam e engajam prospects com conversas personalizadas.

O grande diferencial é a integração com o **N8N**, permitindo que os usuários conectem facilmente seus fluxos de trabalho com uma vasta gama de ferramentas, como CRMs, WhatsApp e muito mais, criando um ecossistema de automação poderoso e flexível.

## ✨ Funcionalidades Principais

* **Autenticação Segura:** Sistema completo de registro e login de usuários com hash de senhas (`bcrypt`) e tokens JWT.
* **Dashboard Intuitivo:** Uma interface amigável para gerenciamento de projetos, acompanhamento de performance e visualização de dados em tempo real.
* **Agentes de IA Especializados:** Crie e configure agentes de IA para segmentos de mercado específicos, otimizando a captura e qualificação de leads.
* **Integração com N8N:** Conecte seus bots e fluxos de atendimento a qualquer ferramenta que você já utiliza no seu negócio.
* **Acompanhamento em Tempo Real:** Monitore cada interação, mensagem enviada e lead capturado diretamente do dashboard.
* **Design Moderno e Responsivo:** Interface construída com as melhores práticas de UI/UX, totalmente adaptável a qualquer dispositivo.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um stack moderno e robusto, focado em performance, escalabilidade e uma excelente experiência de desenvolvimento.

### Frontend

* **Framework:** [Next.js](https://nextjs.org/) (com App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Gerenciamento de Formulários:** [React Hook Form](https://react-hook-form.com/) com [Zod](https://zod.dev/) para validação.

### Backend

* **Ambiente de Execução:** [Node.js](https://nodejs.org/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **Autenticação:** JWT (JSON Web Tokens) e `bcrypt` para hashing de senhas.

### Automação

* **Workflow:** [N8N](https://n8n.io/) (integração para automação de processos).

## ⚙️ Rodando o Projeto Localmente

Para colocar o Pointer AI para rodar na sua máquina, siga estes passos.

### Pré-requisitos

* Node.js (versão 18 ou superior)
* npm, yarn ou pnpm
* Uma instância do PostgreSQL rodando

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/SaaSBotMessage.git](https://github.com/seu-usuario/SaaSBotMessage.git)
    cd SaaSBotMessage
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    Renomeie o arquivo `.env.example` para `.env.local` e preencha com as suas credenciais do banco de dados e a chave secreta para JWT.

    ```env
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"
    JWT_SECRET="SUA_CHAVE_SECRETA_SUPER_SECRETA"
    ```

4.  **Execute as migrations (se houver):**
    *Você precisará criar a tabela `users` no seu banco de dados. Aqui está um SQL de exemplo:*
    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Pronto! Agora você pode acessar a aplicação em [http://localhost:3000](http://localhost:3000).

## 📁 Estrutura do Projeto
/SaaSBotMessage
├── /app
│   ├── /api          # Rotas de API (autenticação)
│   ├── /dashboard    # Página do dashboard (protegida)
│   ├── /login        # Página de login
│   ├── /register     # Página de registro
│   ├── layout.tsx    # Layout principal da aplicação
│   └── page.tsx      # Landing Page
├── /components
│   ├── /ui           # Componentes reutilizáveis do Shadcn/UI
│   ├── /bento        # Componentes do grid da landing page
│   └── ...           # Outros componentes específicos
├── /contexts
│   └── AuthContext.tsx # Contexto de autenticação
├── /lib
│   ├── db.ts         # Configuração da conexão com o banco de dados
│   └── utils.ts      # Funções utilitárias
└── ...               # Outros arquivos de configuração

O projeto segue a estrutura do App Router do Next.js, com uma organização clara e modular:
