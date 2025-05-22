/**
 * Создает HTML-элемент задачи
 *
 * @param {object} task - объект задачи:
 * @param {string} task.id - уникальный идентификатор задачи
 * @param {boolean} task.completed - статус выполнения задачи
 * @param {string} task.text - текст задачи
 *
 * @returns {string} - HTML-элемент задачи
 */
const createTaskElement = task => {
  const taskItem = document.createElement('div')
  taskItem.classList.add('task-item')
  taskItem.dataset.taskId = task.id
  taskItem.innerHTML = `
      <div class="task-item__main-container">
          <div class="task-item__main-content">
              <form class="checkbox-form">
                  <input
                    class="checkbox-form__checkbox"
                    type="checkbox"
                    id="task-${task.id}"
                    ${task.completed ? 'checked="true"' : ''}>
                  <label for="task-${task.id}"></label>
              </form>
              <span class="task-item__text">
                  ${task.text}
              </span>
          </div>
          <button class="task-item__delete-button default-button delete-button">
              Удалить
          </button>
      </div>
    `
  return taskItem
}
// Массив задач
const tasks = [
  {
    id: '1138465078061',
    completed: false,
    text: 'Посмотреть новый урок по JavaScript',
  },
  {
    id: '1138465078062',
    completed: false,
    text: 'Выполнить тест после урока',
  },
  {
    id: '1138465078063',
    completed: false,
    text: 'Выполнить ДЗ после урока',
  },
]
// Контейнер для задач
const tasksContainer = document.querySelector('.tasks-list')
// Рендерим задачи
tasks.forEach(task => {
  const taskElement = createTaskElement(task)
  tasksContainer.append(taskElement)
})
// Добавляем задачу с помощью формы
const form = document.querySelector('.create-task-block')
form.addEventListener('submit', event => {
  event.preventDefault()
  const text = event.target.taskName.value
  if (!text) {
    alert('Введите текст задачи!')
    return
  }
  const newTaskEl = createTaskElement({
    id: Date.now().toString(),
    completed: false,
    text,
  })
  tasks.push(newTask)
  tasksContainer.append(newTaskEl)
})
