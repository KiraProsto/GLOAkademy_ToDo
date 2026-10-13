const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const toDoData = JSON.parse(localStorage.getItem('todo')) || [];

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    item.completed ? todoCompleted.append(li) : todoList.append(li);

    li.querySelector('.todo-complete').addEventListener('click', () => {
      item.completed = !item.completed;
      saveToLocalStorage();
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', () => {
      const index = toDoData.indexOf(item);
      if (index !== -1) {
        toDoData.splice(index, 1);
      }
      saveToLocalStorage();
      render();
    });
  });
};

const saveToLocalStorage = () => {
  localStorage.setItem('todo', JSON.stringify(toDoData));
};

todoControl.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!headerInput.value.trim()) {
    return;
  }

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);
  saveToLocalStorage();
  headerInput.value = '';
  render();
});

render();
