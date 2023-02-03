const API_URL_PREFIX = "https://j1x5q4zn51.execute-api.ap-northeast-1.amazonaws.com"

const taskListElement = document.getElementById('task-list')
const taskTitleInputElement = document.getElementById('task-title-input')
const taskAddButtonElement = document.getElementById('task-add-button')

async function loadTasks() {
  const response = await fetch(API_URL_PREFIX + '/tasks')
  const responseBody = await response.json()

  const tasks = responseBody.tasks

  while (taskListElement.firstChild) {
    taskListElement.removeChild(taskListElement.firstChild)
  }

  tasks.forEach((task) => {
    const liElement = document.createElement('li')
    liElement.innerText = task.title

    taskListElement.appendChild(liElement)
  })
}

async function registerTask() {
  const title = taskTitleInputElement.value

  const requestBody = {
    title: title
  }

  await fetch(API_URL_PREFIX + '/tasks', {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
  
  await loadTasks()
}

async function main() {
  taskAddButtonElement.addEventListener('click', registerTask)
  await loadTasks()
}

main()
/*
const taskTitleInputElement = document.getElementById("task-list-input")
const taskAddButtonElement = document.getElementById("task-add-button")
const taskListElement = document.getElementById("task-list")

async function loadTasks() {
  const response = await fetch("https://j1x5q4zn51.execute-api.ap-northeast-1.amazonaws.com/tasks")

  window.alert("hoge")

  const responseBody = await response.json()

  const tasks = responseBody.tasks

  while(taskListElement.firstChild) {
    taskListElement.removeChild(taskListElement.firstChild)
  }

  tasks.forEach((task) => {
    const liElement = document.createElement("li") 
    liElement.innerText = task.title

    taskListElement.appendChild(liElement)
  })
}

async function registerTask() {
  const title = taskTitleInputElement.value

  const requestBody = {
    title: title
  }

  await fetch(API_URL_PREFIX + "/tasks", {
    method: "POST",
    body: JSON.stringify(requestBody)
  })

  await loadTasks()
}

async function main() {
  taskAddButtonElement.addEventListener("click", registerTask)

  await loadTasks()
}

main()
*/
