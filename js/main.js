let tasks = [
  {
    title: "Abattre les murs porteurs",
    priority: 1
  },
  {
    title: "Nourrir le chien",
    priority: 1
  },
  {
    title: "Partir en guerre contre les moustiques",
    priority: 1
  },
  {
    title: "Courrir après les rats/souris",
    priority: 2
  },
  {
    title: "Acheter un marteau-piqueur",
    priority: 2
  },
  {
    title: "Ne pas répondre aux mails",
    priority: 3
  },
  {
    title: "Se dénoncer pour le crime commis",
    priority: 3
  },
  {
    title: "Dormir",
    priority: 3
  },
  {
    title: "Peindre un passage piéton devant la porte",
    priority: 3
  }
];

const to_do_list = document.querySelectorAll('td[data-priority]');
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
  to_do_list.forEach(item => item.innerHTML = null)
  for (const task of tasks) {
    to_do_list[task.priority - 1].innerHTML += `
      <label class="priority_${task.priority}">
          <input type="checkbox">
          ${task.title}
      </label>
    `;
  }
}


/*------------------------------------------------------------*/
/* SUPPRIMER LES TÂCHES */

const tasks_delete_btn = document.querySelector('.delete_tasks');

tasks_delete_btn.addEventListener('click', () => {
  const tasks_lists = document.querySelectorAll('.table_column label');
  let counter = 0;

  for (let i = tasks_lists.length - 1; i >= 0; i--) {
    const checkbox = tasks_lists[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      counter++;
      tasks.splice(i, 1);
    }
  }

  if (counter > 0) {
    renderTasks();
    setToLocalStorage();
    window.alert(`${counter} tâches supprimées avec succès`);
  }
});



