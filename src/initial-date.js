const initialData ={
    task: {
        'task-1': {'id': 1, 'content': 'FYP Compelition'},
        'task-2': {'id': 2, 'content': 'Ethad Commercial'},
        'task-3': {'id': 3, 'content': 'React-JS Course'},
        'task-4': {'id': 4, 'content': '20 Push Ups'},
    },
    columns: {
        'column-1': {'id': 'column-1', 'title': 'To Do', 'taskIds': ['task-1', 'task-2', 'task-3', 'task-4']},
        'column-2': {'id': 'column-2', 'title': 'Doing', 'taskIds': []},
        'column-3': {'id': 'column-3', 'title': 'Done', 'taskIds': []}
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData