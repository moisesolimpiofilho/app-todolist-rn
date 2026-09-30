import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@estudos:tarefas';

// 💾 Salvar
export async function salvarTarefas(tasks) {
    try {
        const texto = JSON.stringify(tasks);
        await AsyncStorage.setItem(CHAVE, texto);
    } catch (erro) {
        console.log('Erro ao salvar:', erro);
    }
}

// 📖 Carregar
export async function carregarTarefas() {
    try {
        const texto = await AsyncStorage.getItem(CHAVE);

        if (texto === null) {
            return null;   // nada salvo ainda
        }

        return JSON.parse(texto);
    } catch (erro) {
        console.log('Erro ao carregar:', erro);
        return null;
    }
}