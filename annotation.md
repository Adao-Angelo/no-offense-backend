
# Documentação do Sistema

## Regras de Negócio

- **Cadastro e Login**
  - O usuário deve ser capaz de criar uma conta (cadastro) e realizar login na aplicação.
  
- **Publicações**
  - Deve ser possível criar uma nova publicação, que pode incluir texto e uma imagem opcional.
  
- **Comentários**
  - Deve ser possível adicionar comentários às publicações existentes.
  
- **Visualização de Publicações**
  - O sistema deve permitir que os usuários visualizem todas as publicações feitas por todos os usuários.
  
- **Visualização de Comentários**
  - Deve ser possível visualizar todos os comentários associados a uma publicação específica.
  
- **Detecção de Comentários Ofensivos**
  - O sistema deve ter um mecanismo para detectar comentários ofensivos, barrá-los e enviar um alerta ao usuário que tentou publicar o comentário.

---

## Entidades

### 📅 Usuário 

- **id**: Identificador único do usuário.
- **nome**: Nome completo do usuário.
- **senha**: Senha utilizada para autenticação.
- **email**: Email único do usuário.
- **data de criação**: Data em que o usuário foi criado.

---

### 📝 Publicações 

- **id**: Identificador único da publicação.
- **user_id**: ID do usuário que criou a publicação.
- **texto**: Texto da publicação.
- **image_url**: URL da imagem associada à publicação (opcional).
- **data de criação**: Data em que a publicação foi criada.
- **descrição da imagem**: Descrição da imagem associada (opcional).

---

### 💬 Comentários 

- **id**: Identificador único do comentário.
- **user_id**: ID do usuário que fez o comentário.
- **publication_id**: ID da publicação à qual o comentário está associado.
- **texto**: Texto do comentário.
- **data de criação**: Data em que o comentário foi criado.

---

## Considerações Finais

Esta documentação fornece uma visão geral das regras de negócio e das entidades do sistema. É importante garantir que todas as funcionalidades estejam implementadas de acordo com essas diretrizes para atender às necessidades dos usuários.
