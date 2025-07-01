let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

function renderTasks() {
  const taskUl = document.getElementById('task-list');
  taskUl.innerHTML = '';

  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(index);

    const controls = document.createElement('div');
    controls.className = 'task-controls';
    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(controls);

    taskUl.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Task cannot be empty!');
    return;
  }

  taskList.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newTask = prompt('Edit your task:', taskList[index].text);
  if (newTask !== null && newTask.trim() !== '') {
    taskList[index].text = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskList.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
