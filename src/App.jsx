import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { styles } from './styles';
import { addTask, toggleTask, removeTask, contarConcluidas } from './task';
import { salvarTarefas, carregarTarefas } from './storage';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [carregando, setCarregando] = useState(true);

    async function iniciar() {
        const tarefasSalvas = await carregarTarefas();

        if (tarefasSalvas !== null) {
            setTasks(tarefasSalvas);
        } else {
            setTasks([
                { id: '1', title: 'Estudar React Native', done: false },
                { id: '2', title: 'Revisar JavaScript', done: true },
            ]);
        }

        // 🎭 Simula um carregamento de 2 segundos
        setTimeout(function () {
            setCarregando(false);
        }, 2000);
    }

    // 📖 Carrega as tarefas salvas ao abrir o app
    // quando o array está vazio [] o useEffect só roda uma vez
    useEffect(function () {
        iniciar();
    }, []);

    // 💾 Salva sempre que "tasks" mudar
    // Fica observando as variáveis dentro do array
    // [tasks, carregando]
    useEffect(function () {
        if (carregando === false) {
            salvarTarefas(tasks);
        }
    }, [tasks, carregando]);

    // ➕ Adicionar
    function handleAdd() {
        if (text.trim() === '') return;

        const novaLista = addTask(tasks, text);
        setTasks(novaLista);
        setText('');
    }

    // ✅ Marcar/desmarcar
    function handleToggle(id) {
        const novaLista = toggleTask(tasks, id);
        setTasks(novaLista);
    }

    // ❌ Remover
    function handleRemove(id) {
        const novaLista = removeTask(tasks, id);
        setTasks(novaLista);
    }

    // 🔢 Contador
    const concluidas = contarConcluidas(tasks);

    // ⏳ Tela de carregamento
    if (carregando === true) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>📚 Meus Estudos</Text>
                <Text style={styles.subtitle}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📚 Meus Estudos</Text>
            <Text style={styles.subtitle}>
                {concluidas} de {tasks.length} concluídas
            </Text>

            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova matéria..."
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleAdd}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <TouchableOpacity
                            style={styles.taskLeft}
                            onPress={() => handleToggle(item.id)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    item.done ? styles.checkboxDone : null,
                                ]}
                            >
                                {item.done ? (
                                    <Text style={styles.checkmark}>✓</Text>
                                ) : null}
                            </View>
                            <Text
                                style={[
                                    styles.taskText,
                                    item.done ? styles.taskTextDone : null,
                                ]}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleRemove(item.id)}>
                            <Text style={styles.remove}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}