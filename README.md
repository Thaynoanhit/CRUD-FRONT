# Crud-Front
## Ultilizando Ionic + Angular

📋 Descrição
Aplicativo móvel para gerenciamento de produtos desenvolvido com Ionic 8 e Angular 19. Permite realizar operações CRUD (Criar, Ler, Atualizar e Deletar) de produtos, com suporte para upload de imagens e categorização.

# ✨ Funcionalidades

* ✅ Listagem de produtos com detalhes

* ✅ Visualização detalhada de produtos

* ✅ Adição de novos produtos

* ✅ Edição de produtos existentes

* ✅ Exclusão de produtos

* ✅ Upload de imagens para produtos

* ✅ Categorização de produtos

# 🛠️ Tecnologias Utilizadas

* Ionic 8: Framework de desenvolvimento frontend

* Angular 19: Framework JavaScript para desenvolvimento de aplicações web

* TypeScript: Linguagem de programação

* Capacitor 7: Bridge nativo para aplicações móveis

* HttpClient: Módulo para requisições HTTP

* RESTful API: Comunicação com backend via API REST

# 📱 Plataformas Suportadas
* ⚡ Android
  
* 🌐 Web

# 🚀 Configuração do Projeto

### Pré-requisitos

* Node.js (versão recomendada: 18.x ou superior)

* npm ou Yarn

* Angular CLI

* Ionic CLI

* Android Studio (para build Android)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/CRUD.git
cd CRUD
```
### 2. Instale as dependências

```bash
git clone https://github.com/seu-usuario/CRUD.git
cd CRUD
```

### 3. Configure o endereço da API:

```bash
Abra o arquivo src/app/services/produto.service.ts
Altere a URL da API na variável apiUrl
```

Execução:
```bash
Para iniciar o projeto em modo de desenvolvimento:
npm start

Para compilar para Android:

ionic cap add android
ionic cap sync
ionic cap open android

para inicar em live reload no android studio use:

ionic ionic capacitor run android --external -l
```


# 👥 Contribuição

* Faça um fork do repositório
* Crie um branch para sua feature (git checkout -b feature/nova-funcionalidade)
* Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')
* Push para o branch (git push origin feature/nova-funcionalidade)
* Abra um Pull Request
