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

/* 15. Формы */

// Добавляем задачу с помощью формы
const form = document.querySelector('.create-task-block')

form.addEventListener('submit', event => {
  event.preventDefault()

  const text = event.target.taskName.value
  // валидация ввода
  const validationError = validation(text)
  let validationErrorEl = document.querySelector('.error-message-block')
  if (validationError) {
    if (!validationErrorEl) {
      validationErrorEl = document.createElement('span')
      validationErrorEl.classList.add('error-message-block')
      form.append(validationErrorEl)
    }
    validationErrorEl.textContent = validationError
    return
  }
  // валидация прошла успешно
  if (validationErrorEl) validationErrorEl.remove()
  // создаем новую задачу
  const newTask = {
    id: Date.now().toString(),
    completed: false,
    text,
  }
  // добавляем новую задачу в массив задач и рендерим ее
  tasks.push(newTask)
  const newTaskEl = createTaskElement(newTask)
  tasksContainer.append(newTaskEl)
})
// Валидация ввода текста задачи
const validation = text => {
  if (!text) return 'Название задачи не должно быть пустым'
  const isTaskExists = tasks.some(task => task.text.trim() === text.trim())
  if (isTaskExists) return 'Задача с таким текстом уже существует'
  return ''
}

// Удаление задачи
const modal = document.querySelector('.modal-overlay')
const modalDeleteButton = modal.querySelector('.delete-modal__confirm-button')
const modalCancelButton = modal.querySelector('.delete-modal__cancel-button')
const hideModalClass = 'modal-overlay_hidden'

tasksContainer.addEventListener('click', event => {
  const { target } = event
  // делегируем событие клика на кнопку "Удалить"
  const isDeleteButton = target.classList.contains('task-item__delete-button')
  if (isDeleteButton) {
    const taskItem = target.closest('.task-item')
    modal.classList.remove(hideModalClass)
    // нажатие на кнопку "Удалить" в модальном окне
    modalDeleteButton.onclick = () => {
      deleteTask(taskItem)
      modal.classList.add(hideModalClass)
      // обнуляем обработчик при закрытии модального окна
      modalDeleteButton.onclick = null
    }
    // нажатие на кнопку "Отмена" в модальном окне
    modalCancelButton.onclick = () => {
      modal.classList.add(hideModalClass)
      // обнуляем обработчик при закрытии модального окна
      modalCancelButton.onclick = null
    }
  }
})
// удаляет задачу из массива задач и DOM
const deleteTask = taskItem => {
  const taskId = taskItem.dataset.taskId
  const deletedTask = tasks.splice(
    tasks.findIndex(task => task.id === taskId),
    1
  )
  console.log('deletedTask', deletedTask)
  taskItem.remove()
}

// Cмена темы
document.addEventListener('keydown', event => {
  const tabPressed = event.code === 'Tab'
  if (tabPressed) {
    event.preventDefault()
    const body = document.body
    const buttons = document.getElementsByTagName('button')
    if (body.dataset.theme === 'dark') {
      body.dataset.theme = ''
      body.style.backgroundColor = 'inherit'
      tasksContainer.style.color = 'inherit'
      for (const button of buttons) {
        button.style.border = 'none'
      }
    } else {
      body.dataset.theme = 'dark'
      body.style.backgroundColor = '#24292E'
      tasksContainer.style.color = '#ffffff'
      for (const button of buttons) {
        button.style.border = '1px solid #ffffff'
      }
    }
  }
})
