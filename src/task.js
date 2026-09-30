export function addTask(tasks, titulo) {
    const novaTarefa = {
        id: Date.now().toString(),
        title: titulo,
        done: false,
    };

    const novaLista = [novaTarefa];
    for (let i = 0; i < tasks.length; i++) {
        novaLista.push(tasks[i]);
    }
    return novaLista;
}

export function toggleTask(tasks, id) {
    const novaLista = [];

    for (let i = 0; i < tasks.length; i++) {
        const tarefa = tasks[i];

        if (tarefa.id === id) {
            novaLista.push({
                id: tarefa.id,
                title: tarefa.title,
                done: !tarefa.done,
            });
        } else {
            novaLista.push(tarefa);
        }
    }

    return novaLista;
}

export function removeTask(tasks, id) {
    const novaLista = [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            novaLista.push(tasks[i]);
        }
    }

    return novaLista;
}

export function contarConcluidas(tasks) {
    let total = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) {
            total = total + 1;
        }
    }

    return total;
}