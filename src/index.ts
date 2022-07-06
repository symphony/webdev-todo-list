import { v4 as uuidV4 } from 'uuid';

// types
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// helpers
const saveTasks = () => {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
};

const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem('TASKS');
  return tasks ? JSON.parse(tasks) : [];
};

const addListItem = (task: Task) => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  saveTasks();
};


// constants
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLInputElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener('submit', e => {
  e.preventDefault()
  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  addListItem(newTask);
  input.value = '';
});
