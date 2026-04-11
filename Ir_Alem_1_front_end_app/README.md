# CardioIA Portal — Interface Front-end

> **Ir Além 1** — Disciplina de Inteligência Artificial aplicada à Saúde · FIAP  
> Módulo: Criando a interface do CardioIA  

Portal web que simula a interface de gestão cardiovascular, complementando o classificador ML desenvolvido nas Partes 1 e 2 do CardioIA.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + Vite 5 |
| Roteamento | React Router DOM v6 |
| Estado Global | Context API + useReducer |
| Estilização | CSS Modules |
| Persistência | localStorage (simulado) |
| Dados | JSON local (sem backend) |

---

## Instalação e Execução

```bash
# 1. Entrar na pasta do projeto
cd Ir_Alem_1_front_end_app

# 2. Instalar dependências (apenas locais, na node_modules/)
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev

# 4. Acessar no navegador
# http://localhost:5173
```

### Build para produção

```bash
npm run build    # gera a pasta dist/
npm run preview  # visualiza o build localmente
```

---

## Credenciais de Demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Médico | carlos@cardioia.br | 12345 |
| Médico | fernanda@cardioia.br | 12345 |
| Administrador | admin@cardioia.br | admin |

> As credenciais também estão disponíveis na própria tela de login em "Credenciais de demonstração".

---

## Funcionalidades

- **Autenticação simulada** com JWT fake gerado via `btoa` e armazenado no `localStorage`
- **Rotas protegidas** com redirect automático para `/login` se não autenticado
- **Listagem de 20 pacientes** com dados derivados do `dados_cardiacos.csv` do CardioIA
  - Busca por nome, ID ou médico
  - Filtro por nível de risco cardiovascular
  - Toggle entre visualização em cards e tabela ordenável
  - Modal de detalhes completos
- **Dashboard** com métricas em tempo real:
  - Total de pacientes
  - Consultas agendadas / confirmadas
  - Pacientes de alto risco
  - Distribuição visual de risco (barra CSS pura)
  - Tabela de agendamentos recentes
- **Agendamento de consultas**:
  - Formulário com `useReducer` para dados + `useState` para validação
  - Slots de horário de 07:00 a 18:30 (intervalos de 30 min)
  - Validação de campos e data não pode ser no passado
  - Persistência automática no `localStorage`
  - Filtros por status: Todos / Agendado / Confirmado / Cancelado / Realizado
- **Design responsivo** para desktop e mobile

---

## Estrutura de Pastas

```
src/
├── contexts/
│   ├── AuthContext.jsx          # Autenticação simulada (JWT fake, login, logout)
│   └── AppointmentContext.jsx   # Estado global de agendamentos (useReducer)
├── components/
│   ├── layout/
│   │   ├── Layout.jsx           # Shell da aplicação (Navbar + Sidebar + Outlet)
│   │   ├── Navbar.jsx           # Barra superior com usuário e logout
│   │   ├── Sidebar.jsx          # Menu lateral com NavLink ativos
│   │   └── ProtectedRoute.jsx   # Guarda de rota (redireciona para /login)
│   ├── ui/
│   │   ├── Button.jsx           # Botão reutilizável (variantes, tamanhos, loading)
│   │   ├── Badge.jsx            # Badge colorido por status/risco
│   │   ├── Card.jsx             # Container genérico
│   │   ├── StatCard.jsx         # Card de métrica com ícone e acento colorido
│   │   └── Modal.jsx            # Modal com backdrop e fechar via Escape
│   └── patients/
│       ├── PatientCard.jsx      # Card de paciente (grid)
│       └── PatientTable.jsx     # Tabela de pacientes com ordenação
├── pages/
│   ├── Login/                   # Tela de autenticação
│   ├── Dashboard/               # Painel principal com métricas
│   ├── Patients/                # Listagem e detalhes de pacientes
│   ├── Appointments/            # Lista de agendamentos + formulário
│   └── NotFound/                # Página 404
├── services/
│   ├── authService.js           # MOCK_USERS, generateFakeJWT, isTokenValid
│   └── patientService.js        # fetchPatients, fetchPatientById (async simulado)
├── hooks/
│   └── useLocalStorage.js       # Hook genérico de persistência
├── utils/
│   └── dateUtils.js             # formatDate, generateTimeSlots, todayISO
└── data/
    ├── patients.json            # 20 pacientes simulados
    └── appointments.json        # 5 agendamentos iniciais (seed)
```

---

## Conceitos React Demonstrados

| Conceito | Onde é usado |
|---|---|
| `useState` | Login, formulários, filtros, modais |
| `useEffect` | Carregamento de pacientes, rehydration do token, sincronização localStorage |
| `useReducer` | `AppointmentContext` (estado global) + `AppointmentForm` (estado do formulário) |
| `useContext` | `useAuth()`, `useAppointments()` em todos os componentes consumidores |
| Custom Hooks | `useLocalStorage`, `useAuth`, `useAppointments` |
| Context API | `AuthProvider`, `AppointmentProvider` |
| React Router v6 | `BrowserRouter`, `Routes`, `Route`, `Navigate`, `NavLink`, `Outlet`, `useNavigate`, `useLocation` |
| Rotas protegidas | `ProtectedRoute` com `<Navigate to="/login" replace />` |
| CSS Modules | Todos os componentes e páginas |

---

## Dados Simulados

Os dados de pacientes são derivados do arquivo `dados_cardiacos.csv` do CardioIA (Fase 2), com campos como pressão arterial, colesterol, frequência cardíaca, sintomas e fatores de risco cardiovascular. Nenhuma requisição de rede é realizada — tudo é servido via `import` de JSON local.

---

## Observações Técnicas

- O JWT fake usa `btoa(encodeURIComponent(...))` para suportar nomes com acentos (UTF-8)
- O `AppointmentContext` usa o terceiro argumento do `useReducer` (função `init`) para carregar do `localStorage` com fallback para o seed JSON
- Todas as "chamadas de API" em `patientService.js` simulam latência com `setTimeout` para demonstrar estados de loading
