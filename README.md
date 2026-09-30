![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

# 📚 TodoList de Estudos

Um aplicativo simples de lista de tarefas para estudos, feito em **React Native** com **Expo**.
Ideal para quem está começando: dá para entender o app inteiro lendo 4 arquivos.

---

## 📱 O que o app faz

- ➕ Adicionar matérias/tarefas de estudo
- ✅ Marcar tarefas como concluídas
- ❌ Remover tarefas
- 🔢 Ver o contador de concluídas (ex: "2 de 5 concluídas")
- 💾 Salvar tudo automaticamente no celular
- 🔄 Recuperar as tarefas ao reabrir o app

---

## 🖼️ Estrutura de arquivos

```
react-native-todolist/
├── index.js                # Ponto de entrada (não precisa mexer)
├── package.json            # Dependências do projeto
├── README.md               # Este arquivo
└── src/
    ├── App.jsx             # Tela + lógica de conexão
    ├── styles.js           # Todos os estilos visuais
    ├── tasks.js            # Funções do CRUD (adicionar, marcar, remover)
    └── storage.js          # Salvar/carregar do celular (AsyncStorage)
```

**Cada arquivo tem UMA responsabilidade.** Isso se chama *separação de responsabilidades*.

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- **Node.js** instalado (versão 18 ou superior)
- **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Ou um emulador Android/iOS configurado no computador

### 2. Instalar as dependências

```bash
npm install
```

### 3. Rodar o app

```bash
npm start
```

Depois:

- 📷 **Escanear o QR Code** com o app Expo Go (celular)
- 🅰️ Apertar `a` → abre no emulador Android
- 🍎 Apertar `i` → abre no simulador iOS
- 🌐 Apertar `w` → abre no navegador (web)

---

## 🧩 Tecnologias usadas

| Tecnologia | Para que serve |
|-----------|----------------|
| **React Native** | Criar apps mobile usando JavaScript/React |
| **Expo** | Facilitar rodar o app sem configurar Android Studio/Xcode |
| **React 19** | Biblioteca base (componentes, hooks, estado) |
| **AsyncStorage** | Guardar dados no celular (parecido com o `localStorage` da web) |
| **JavaScript (ES6+)** | Linguagem base do projeto |

---

## 🧠 Conceitos usados

### 1. **Componentes**

Tudo no app é um componente. O `App` é o componente principal.

```jsx
export default function App() {
    return <View>...</View>;
}
```

### 2. **JSX**

Uma forma de escrever "HTML" dentro do JavaScript:

```jsx
<Text style={styles.title}>📚 Meus Estudos</Text>
```

### 3. **`useState`** — estado do componente

Guarda dados que mudam com o tempo. Quando o estado muda, a tela **atualiza sozinha**.

```jsx
const [tasks, setTasks] = useState([]);
const [text, setText] = useState('');
```

| Estado | Guarda |
|--------|--------|
| `tasks` | A lista de tarefas |
| `text` | O que o usuário digitou no input |
| `carregando` | Se o app ainda está carregando dados |

### 4. **`useEffect`** — efeitos colaterais

Roda código **fora da renderização**: carregar dados, salvar, configurar timers.

```jsx
useEffect(function () {
    // carrega as tarefas quando o app abre
}, []);   // <-- roda só uma vez
```

O array no final controla **quando** o efeito roda:

| Array | Quando roda |
|-------|-------------|
| `[]` | Só uma vez, ao abrir |
| `[tasks]` | Toda vez que `tasks` mudar |
| *(nenhum)* | Toda vez que a tela redesenha |

### 5. **`FlatList`** — listas performáticas

Mostra listas de forma otimizada (só renderiza o que está visível).

```jsx
<FlatList
    data={tasks}                          // 📋 o que mostrar
    keyExtractor={(item) => item.id}      // 🔑 quem é cada item
    renderItem={({ item }) => (           // 🎨 como desenhar
        <Text>{item.title}</Text>
    )}
/>
```

| Propriedade | Para que serve |
|-------------|----------------|
| `data` | A lista de itens |
| `keyExtractor` | Diz qual campo é o **id único** de cada item |
| `renderItem` | Diz **como desenhar** cada item (o "map" do RN) |

### 6. **Funções puras**

As funções em `tasks.js` **não mexem no estado diretamente**. Elas:

- **Recebem** uma lista
- **Devolvem** uma lista nova

```jsx
export function addTask(tasks, titulo) {
    // ...
    return novaLista;
}
```

Isso as torna fáceis de testar e entender isoladamente.

### 7. **`async` / `await`**

Usados para operações que **demoram** (ler/gravar no celular). O código "espera" terminar antes de continuar.

```jsx
const tarefasSalvas = await carregarTarefas();
```

### 8. **`JSON.stringify` / `JSON.parse`**

O AsyncStorage só guarda **texto**. Então convertemos:

```jsx
// Lista → texto (salvar)
const texto = JSON.stringify(tasks);

// Texto → lista (carregar)
const lista = JSON.parse(texto);
```

### 9. **Operador ternário**

Um `if/else` em uma linha só — usado para aplicar estilos condicionais:

```jsx
style={[styles.checkbox, item.done ? styles.checkboxDone : null]}
```

Traduzindo: *"aplique `checkbox` sempre, e `checkboxDone` só se `done` for verdadeiro"*.

---

## 🗂️ Como cada arquivo funciona

### 📄 `src/tasks.js` — CRUD puro

Contém **funções puras** para manipular a lista de tarefas. Não sabe nada de React.

| Função | O que faz |
|--------|-----------|
| `addTask(tasks, titulo)` | Devolve lista nova com a tarefa no topo |
| `toggleTask(tasks, id)` | Devolve lista nova com o `done` invertido |
| `removeTask(tasks, id)` | Devolve lista nova sem a tarefa |
| `contarConcluidas(tasks)` | Devolve o número de tarefas concluídas |

**Exemplo:**

```jsx
const novaLista = addTask(tasks, 'Estudar React Native');
setTasks(novaLista);
```

### 📄 `src/storage.js` — Persistência

Contém funções que salvam e carregam do celular. Não sabe o que é uma "tarefa concluída".

| Função | O que faz |
|--------|-----------|
| `salvarTarefas(tasks)` | Converte em texto e grava no celular |
| `carregarTarefas()` | Lê o texto e devolve a lista (ou `null`) |

### 📄 `src/styles.js` — Estilos

Todos os estilos do app com `StyleSheet.create`. Mudanças visuais acontecem **só aqui**.

| Estilo | O que define |
|--------|--------------|
| `container` | Fundo e padding da tela |
| `title` / `subtitle` | Título e subtítulo |
| `inputRow` / `input` / `addButton` | Campo de texto + botão `+` |
| `taskItem` / `checkbox` / `taskText` | Cada item da lista |
| `remove` | Botão ✕ de remover |

### 📄 `src/App.jsx` — Tela + conexão

Amarra tudo: define o estado, chama as funções de `tasks.js`, salva via `storage.js`, e desenha a tela.

```jsx
function handleAdd() {
    if (text.trim() === '') return;
    setTasks(addTask(tasks, text));   // 1 linha!
    setText('');
}
```

---

## 🔄 O fluxo do app

```
1. App abre
        ↓
2. Carrega tarefas salvas (storage.js)
        ↓
3. Mostra a lista na tela (FlatList)
        ↓
4. Usuário adiciona / marca / remove
        ↓
5. tasks.js gera lista nova
        ↓
6. setTasks() atualiza o estado
        ↓
7. useEffect salva no celular (storage.js)
        ↓
8. FlatList re-renderiza
```

---

## 🧪 Ideias de melhorias (para praticar)

Quer evoluir o projeto? Tente:

1. 🎨 **Trocar as cores** — mexa só em `styles.js`
2. 🗑️ **Botão "Limpar tudo"** — adicione `limparTodas()` em `tasks.js`
3. 🔍 **Filtros** (todas / pendentes / concluídas)
4. 📅 **Data de prazo** por tarefa
5. ⏱️ **Timer de estudo** (Pomodoro)
6. 🌙 **Modo escuro**
7. 📊 **Estatísticas** (total, pendentes, concluídas)

---

## ⚠️ Boas práticas usadas

- ✅ **Separação de responsabilidades** — 1 arquivo, 1 função
- ✅ **Funções puras** — `tasks.js` não mexe em estado
- ✅ **Nunca modificar o estado direto** — sempre criar lista nova
- ✅ **Ternário explícito** — escrever o `else` para leitura clara
- ✅ **Comentários numerados** — explicando o "por quê", não o "o quê"
- ✅ **Nomes descritivos** — `tarefa` em vez de `t`, `titulo` em vez de `x`

---

## 🐛 Problemas comuns

### "Não aparece o botão `+`"

Verifique se o `TouchableOpacity` está importado de `react-native`.

### "As tarefas somem ao fechar o app"

Verifique se `salvarTarefas` está sendo chamado no `useEffect` com `[tasks, carregando]` no final.

### "Erro: AsyncStorage is not defined"

Rode:

```bash
npx expo install @react-native-async-storage/async-storage
```

### "Encountered two children with the same key"

Você tem duas tarefas com o mesmo `id`. O `keyExtractor` precisa de ids únicos — por isso usamos `Date.now().toString()`.

---

## 📚 Referências

- [Documentação oficial do React Native](https://reactnative.dev/)
- [Documentação do Expo](https://docs.expo.dev/)
- [React Hooks — useState](https://react.dev/reference/react/useState)
- [React Hooks — useEffect](https://react.dev/reference/react/useEffect)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

## 📝 Licença

Projeto livre para uso educacional. Sinta-se à vontade para estudar, modificar e compartilhar. 🎓

---

**Feito com 💙 para quem está começando em React Native.**