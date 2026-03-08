# Agendamentos Django Angular

Sistema de gerenciamento de agendamentos com backend em Django REST Framework e frontend em Angular v21.

## Tecnologias Utilizadas

### Backend
- **Django v6**: Framework web Python
- **Django REST Framework**: Para construção da API REST
- **SQLite**: Banco de dados para desenvolvimento
- **Python DotEnv**: Gerenciamento de variáveis de ambiente

### Frontend
- **Angular v21**: Framework para aplicações web
- **Angular Material**: Biblioteca de componentes UI
- **SCSS**: Pré-processador CSS

### Infraestrutura
- **Docker**: Containerização
- **Docker Compose**: Orquestração de containers
- **Nginx**: Servidor web para o frontend

## Como Rodar o Projeto

### Pré-requisitos
É necessário ter instalado os seguintes:
- Docker
- Docker Compose

### Passos para Execução

1. **Clone o repositório e acesse o diretório:**
   ```bash
   git clone https://github.com/FernandoHRocha/agendamentos-django-angular.git
   cd agendamentos-django-angular
   ```

2. **Execute os containers:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000
   - Admin Django: http://localhost:8000/admin/

### Comandos Úteis
- Para parar os containers: `docker-compose down`
- Para reconstruir: `docker-compose up --build`
- Para ver logs: `docker-compose logs -f`

## Endpoints da API

Base URL: `http://localhost:8000/`

### Agendamentos

| Método | Endpoint | Descrição | Status Code |
|--------|----------|-----------|------------|
| GET | `/agendamentos/` | Lista todos os agendamentos | 200 |
| POST | `/agendamentos/` | Cria um novo agendamento | 201 |
| GET | `/agendamentos/{id}/` | Detalhes de um agendamento específico | 200 |
| PUT | `/agendamentos/{id}/` | Atualiza um agendamento | 200 |
| DELETE | `/agendamentos/{id}/` | Remove um agendamento | 204 |

### Campos do Agendamento

- `titulo` (string, obrigatório, mínimo 5 caracteres): Título do agendamento
- `data` (date, obrigatório): Data do agendamento (YYYY-MM-DD)
- `horario` (time, obrigatório): Horário do agendamento (HH:MM)
- `descricao` (string, opcional): Descrição adicional
- `status` (string, opcional): Status do agendamento
  - `pending`: Pendente (padrão)
  - `confirmed`: Confirmado
  - `cancelled`: Cancelado
- `created_at` (datetime, automático): Data de criação

### Exemplos de Uso

**Criar agendamento:**
```json
POST /agendamentos/
payload

{
  "titulo": "Reunião de equipe",
  "data": "2026-12-01",
  "horario": "14:00:00",
  "descricao": "Discussão sobre próximos projetos",
  "status": "pending"
}
```

**Listar agendamentos:**
```json
GET /agendamentos/
retorno

[
  {
    "id": 1,
    "titulo": "Reunião de equipe",
    "data": "2024-12-01",
    "horario": "14:00:00",
    "descricao": "Discussão sobre próximos projetos",
    "status": "pending",
    "created_at": "2024-11-15T10:30:00Z"
  }
]
```

## Endpoints do Frontend
Base URL: `http://localhost:4200/`

- **Home**: `/` - Breve apresentação do sistema
- **Lista de Agendamentos**: `/agendamento` - Exibe todos os agendamentos com opções de editar e excluir
- **Criar Agendamento**: `/agendamento/criar` - Formulário para criar novo agendamento
- **Editar Agendamento**: `/agendamento/editar/{id}` - Formulário para editar agendamento existente


## Decisões Técnicas

### Arquitetura
- **Separação clara entre backend e frontend**: API REST pura no backend permite escalabilidade e reutilização
- **SPA (Single Page Application)**: Angular fornece experiência fluida ao usuário sem recarregamentos de página

### Banco de Dados
- **SQLite para desenvolvimento**: Simplicidade e zero configuração, adequado para protótipos e desenvolvimento local
- **Estrutura preparada para migração**: Uso de migrations do Django facilita mudança para PostgreSQL/MySQL em produção

### Validações
- **Validação de datas futuras**: Impede criação e edição de agendamentos no passado
- **Validação de título**: Mínimo de 5 caracteres para garantir descrições significativas

### Containerização
- **Docker Compose**: Simplifica setup do ambiente de desenvolvimento
- **Volumes para persistência**: Dados do banco SQLite são persistidos e recuperados sempre que subimos novamente os containers
- **Dependências claras**: Frontend depende do backend, garantindo ordem de inicialização correta

### Segurança
- **CORS configurado**: Permite comunicação segura entre frontend e backend em desenvolvimento
- **Variáveis de ambiente**: Configurações sensíveis podem ser externalizadas

### Frontend
- **Listagem com delay proposital**: Simula latência de rede para testar experiência do usuário e mostrar feedback de carregamento
- **Interface Responsiva**: Interface adaptável para diferentes tamanhos de tela usando Angular Material
- **Componentização**: Código organizado em componentes reutilizáveis para melhor manutenção
- **Gerenciamento de estado**: Uso de serviços Angular para compartilhar dados entre componentes
- **Estilos com SCSS**: Permite organização e reutilização de estilos, além de tema escuro/claro para melhor experiência do usuário

## Possíveis Melhorias
- **Campo de Data e Hora combinados**: Unificar data e hora em um único campo tipo timestamp pode simplificar manipulação e facilitar implementação de diferentes fusos horários.