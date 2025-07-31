# BEES Tech Test

## Sobre o Projeto

Este projeto é uma aplicação web para busca e gerenciamento de bares, desenvolvida como parte de um teste técnico. A aplicação permite que usuários se autentiquem, pesquisem bares e salvem seus favoritos.

## Tecnologias Utilizadas

- React + TypeScript + Vite
- Tailwind CSS
- Context API (migrado de Redux)
- React Router

## Arquitetura

A aplicação segue os princípios de Clean Architecture, com separação clara de responsabilidades:

- **Presentation Layer**: Componentes React
- **State Management**: Context API
- **Domain Layer**: Tipos e interfaces
- **Data Layer**: Persistência com localStorage

Para mais detalhes sobre a arquitetura, consulte o arquivo [architecture.md](./architecture.md).

## Migração de Redux para Context API

A aplicação foi originalmente desenvolvida usando Redux e Redux-Saga para gerenciamento de estado. Foi realizada uma migração para Context API para simplificar a arquitetura e reduzir dependências.

### Benefícios da Migração

- **Código mais simples**: Menos boilerplate e configuração
- **Melhor coesão**: Lógica de negócio mais próxima dos componentes
- **Menor bundle size**: Menos dependências externas
- **Melhor testabilidade**: Componentes mais isolados e focados

## Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos para gerenciamento de estado
├── hooks/          # Hooks personalizados
├── pages/          # Páginas da aplicação
├── types/          # Tipos e interfaces
└── utils/          # Funções utilitárias
```

## Funcionalidades

- **Autenticação**: Login simples com verificação de idade
- **Pesquisa de Bares**: Busca por nome, endereço ou localização
- **Gerenciamento de Favoritos**: Adicionar e remover bares favoritos
- **Persistência de Dados**: Dados salvos no localStorage

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build
```

## Próximos Passos

- Implementar testes unitários e de integração
- Adicionar documentação de componentes com Storybook
- Melhorar a acessibilidade da aplicação
- Implementar internacionalização
