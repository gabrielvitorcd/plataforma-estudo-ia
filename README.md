<div align="center">

# 🎓 Plataforma de Estudos com Inteligência Artificial  

**Sistema de aprendizado adaptativo** para concursos e vestibulares, com geração de questões, correção automática e gamificação — tudo impulsionado por **IA** 🤖  

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)

</div>

---

## 🚀 Visão Geral

A **Plataforma de Estudos com IA** é um ambiente digital inteligente que personaliza o aprendizado conforme o desempenho do aluno.  

Combinando **IA generativa**, **análise de progresso** e **gamificação**, o sistema oferece uma experiência completa de preparação para concursos e vestibulares.

---

## 🧩 Funcionalidades Principais

### 📚 Geração de Conteúdo com IA
- Criação automática de **questões personalizadas** (por matéria, nível e tema).  
- **Feedback inteligente** e explicações detalhadas de erros.  
- Correção de **redações** com nota e observações construtivas.  

### 🧠 Aprendizado Adaptativo
- A IA identifica **pontos fracos** e gera revisões específicas.  
- Sistema de **níveis de domínio** baseado em tentativas e acertos.  
- Análise contínua de desempenho via **modelo ELO/IRT simplificado**.

### 🏆 Gamificação
- Ganha **XP** ao responder corretamente e completar desafios.  
- **Ranking semanal** e **conquistas** por desempenho.  
- Dashboard com **gráficos e estatísticas** de evolução.

### 🔊 Recursos Extras (planejados)
- **Text-to-Speech (voz)** para leitura de conteúdo.  
- **Modo offline sincronizado** (PWA / mobile app).  
- App mobile com **React Native** ou **Kotlin**.

---

## 🧱 Arquitetura Técnica

| Camada | Tecnologias | Função |
|--------|--------------|--------|
| **Frontend** | Next.js 16, React 19, TailwindCSS v4, Chart.js | Interface e UX |
| **Backend** | FastAPI (Python 3.12), psycopg2, python-dotenv | API e regras de negócio |
| **Banco de Dados** | Supabase (Postgres + Auth) | Autenticação e persistência |
| **IA** | OpenAI API / Dify / LangChain | Geração e correção de conteúdo |
| **Infraestrutura** | Docker, Railway / Render / Vercel | Deploy e CI/CD |

---

## 📁 Estrutura do Projeto

```bash
plataforma-estudo-ia/
│
├── frontend/           # Next.js + TailwindCSS
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/supabaseClient.ts
│   │   └── pages/
│   └── tailwind.config.ts
│
├── backend/            # FastAPI + Supabase Integration
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── security.py
│   │   ├── routers/
│   │   │   ├── users.py
│   │   │   ├── study.py
│   │   │   └── progress.py
│   │   └── services/
│   └── requirements.txt
│
└── .env                # Variáveis de ambiente
