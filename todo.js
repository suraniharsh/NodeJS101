const fs = require('fs');

const DB_FILE = 'todos.json';

function initializeDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([]));
    }
}

function readTodos() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading todos:', error.message);
        return [];
    }
}

function writeTodos(todos) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
    } catch (error) {
        console.error('Error writing todos:', error.message);
    }
}

function addTodo(task) {
    try {
        if (!task || task.trim() === '') {
            throw new Error('Task description is required');
        }

        const todos = readTodos();
        todos.push({
            id: Date.now(),
            task: task.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        });
        writeTodos(todos);
        console.log('Todo added successfully!');
    } catch (error) {
        console.error('Error adding todo:', error.message);
    }
}

function listTodos() {
    const todos = readTodos();
    if (todos.length === 0) {
        console.log('No todos found!');
        return;
    }

    todos.forEach((todo, index) => {
        const status = todo.completed ? '[✓]' : '[ ]';
        console.log(`${index + 1}. ${status} ${todo.task} (ID: ${todo.id})`);
    });
}

function deleteTodo(number) {
    try {
        if (!number || isNaN(number)) {
            throw new Error('Valid todo number is required');
        }

        const index = number - 1;
        const todos = readTodos();

        if (index < 0 || index >= todos.length) {
            throw new Error('Invalid todo number');
        }

        todos.splice(index, 1);
        writeTodos(todos);
        console.log('Todo deleted successfully!');
    } catch (error) {
        console.error('Error deleting todo:', error.message);
    }
}

function markTodo(number) {
    try {
        if (!number || isNaN(number)) {
            throw new Error('Valid todo number is required');
        }

        const index = number - 1;
        const todos = readTodos();

        if (index < 0 || index >= todos.length) {
            throw new Error('Invalid todo number');
        }

        if (!todos[index]) {
            throw new Error('Todo not found');
        }

        todos[index].completed = !todos[index].completed;
        writeTodos(todos);
        console.log('Todo status updated successfully!');
    } catch (error) {
        console.error('Error updating todo status:', error.message);
    }
}

function clearTodos() {
    try {
        writeTodos([]);
        console.log('All todos cleared successfully!');
    } catch (error) {
        console.error('Error clearing todos:', error.message);
    }
}

function showUsage() {
    console.log(`Usage:
    node todo.js --add <task>      -a   # Add a new task
    node todo.js --list            -l   # Display all tasks
    node todo.js --delete <number> -d   # Delete a task by number
    node todo.js --mark <number>   -m   # Toggle task completion
    node todo.js --clear           -c   # Delete all tasks
    node todo.js --help            -h   # Display usage instructions
    `);
}

function main() {
    initializeDB();
    const command = process.argv[2];
    const argument = process.argv.slice(3).join(' ');

    switch (command) {
        case '--add':
        case '-a':
            addTodo(argument);
            break;
        case '--list':
        case '-l':
            listTodos();
            break;
        case '--delete':
        case '-d':
            deleteTodo(parseInt(argument));
            break;
        case '--mark':
        case '-m':
            markTodo(parseInt(argument));
            break;
        case '--clear':
        case '-c':
            clearTodos();
            break;
        case '--help':
        case '-h':
            showUsage();
            break;
        default:
            console.log(`Invalid command. Please use --help or -h to display usage instructions.`);
            break;
    }
}

main(); 
