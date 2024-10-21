let tasks = [
  {
    title: "Apprendre mon cours de JavaScript",
    priority: 1
  },
  {
    title: "Créer mon compte Github",
    priority: 2
  },
  {
    title: "Répondre à mes emails",
    priority: 3
  }
];

const to_do_list = document.querySelector('#to_do_list ul');
const to_do_list_form = document.querySelector('#to_do_list_form');
const to_do_list_button = document.querySelector('#to_do_list_form input[type="button"]');

if (localStorage.getItem('todolist')) {
  const storedTasks = localStorage.getItem('todolist');
  const parsedTasks = JSON.parse(storedTasks);
  tasks = [...parsedTasks];
  renderTasks();
} else {
  renderTasks();
}

/*------------------------------------------------------------*/

to_do_list_button.addEventListener('click', (e) => {
  e.preventDefault();
  const form_data = new FormData(to_do_list_form);
  to_do_list.innerHTML += `
    <li>
        <label class="priority_${form_data.get("task_priority")}">
            <input type="checkbox">
            ${form_data.get("task_name")}
        </label>
    </li>
  `;
  tasks.push({
    title: form_data.get("task_name"),
    priority: parseInt(form_data.get("task_priority"))
  })
  sortByPriority(tasks);
  renderTasks();
});

/*------------------------------------------------------------*/
/* FONCTIONS RÉUTILISABLES */

function sortByPriority(array) {
  array.sort((a, b) => a.priority - b.priority);
  setToLocalStorage();
}

function setToLocalStorage() {
  localStorage.removeItem("todolist");
  localStorage.setItem("todolist", JSON.stringify(tasks));
}

function renderTasks() {
  to_do_list.innerHTML = null;
  for (const task of tasks) {
    to_do_list.innerHTML += `
      <li>
          <label class="priority_${task.priority}">
              <input type="checkbox">
              ${task.title}
          </label>
      </li>
    `;
  }
}


/*------------------------------------------------------------*/
/* SUPPRIMER LES TÂCHES */

const tasks_delete_btn = document.querySelector('.delete_tasks');

tasks_delete_btn.addEventListener('click', () => {
  const tasks_lists = document.querySelectorAll('#to_do_list ul li');
  let counter = 0;
  for (let i = 0; i < tasks_lists.length; i++) {
    const checkbox = tasks_lists[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      counter++;
      tasks.splice(i, 1);
    }
  }
  if (counter > 0) {
    renderTasks();
    setToLocalStorage();
    window.alert(`${counter} tâches supprimées avec succès`)
  }
})


