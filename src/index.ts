import { v4 as uuidV4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLInputElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const addListItem = (task: Task) => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
};

form?.addEventListener('submit', e => {
  e.preventDefault()
  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  addListItem(newTask)
});
