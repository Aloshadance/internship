let todoList = []
const addMessage = document.querySelector('.addMessage'),
addButton = document.querySelector('.addTask'),
addPriority = document.querySelector('.addPriority'),
todo = document.querySelector('.todo')

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'))
displayTasks(todoList)
}

  // ДОБАВЛЕНИЕ ЗАДАЧИ

addButton.addEventListener('click', () => {
  if(!addPriority.value && !addMessage.value) return (alert("Выберите приоритет для задачи и заполните поле текста задачи!", "Ошибка"))
  if(!addMessage.value) return (alert("Заполните поле текста задачи!"))
  if(!addPriority.value) return (alert("Выберите приоритет для задачи!"))
  let newTodo = {
      text: addMessage.value,
      priority: addPriority.value,
      date: new Date().toLocaleString(),
      status: "current",
      important: false
    }
  todoList.unshift(newTodo)
displayTasks(todoList)
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value = ''
  addPriority.value = ''
})

  // ВЫВОД ЗАДАЧ

function displayTasks(arr) {
  let displayTask = ''
  if (arr.length === 0) {
  todo.innerHTML = '' }
      arr.forEach((item,i) => {
      outputPriority(item)
      displayTask += `
      <li class="tasks">
      ${priority}
      <label for='item_${i}' class="objective ${item.important ? 'important' : ''}  ">${item.text}</label>
      <small for='item_${i}' class="dateCreate">${item.date}</small>
      <span aria-hidden="true" class="fa fa-trash close" id="item_${i}"></span>
      </li>`
      todo.innerHTML = displayTask
        })
        localStorage.setItem('todo', JSON.stringify(arr))

}
  // УДАЛЕНИЕ

todo.addEventListener('click', function(event) {
  event.preventDefault()
  todoList.forEach((item,i) => {
        if (event.target.closest('.close') && ('item_' + i === event.target.getAttribute('id'))) { 
          todoList.splice(i, 1)
        }
    displayTasks(todoList)
  })
})

function outputPriority(item) {
  if (item.priority === 'highPriority') {
    priority = '<label  class ="priority highPriority">Высокий</label>'
  } else if (item.priority === 'midPriority') {
    priority = '<label class ="priority midPriority" >Средний</label>'
  } else {
    priority = '<label class ="priority poorPriority">Низкий</label>'
  } 
}

  // СОРТИРОВКА ПО ДАТЕ

  function sortByDate(arr) {
    const elSortByDate = document.getElementById('date_sort'),
    temp = JSON.parse(JSON.stringify(arr))
  if (elSortByDate.closest('.active')) {
    temp.sort((a, b) => a['date'] > b['date'] ? 1 : -1)
    elSortByDate.classList.remove('active') }
    else {
      temp.sort((a, b) => a['date'] > b['date'] ? -1 : 1)
      elSortByDate.classList.add('active') 
    }
    displayTasks(temp)
  }

  document.getElementById('test_date').addEventListener('click', () => {
    sortByDate(todoList)
  })

  // СОРТИРОВКА ПО ПРИОРИТЕТУ

  function sortByPriority(arr) {
      const elSortByPriority = document.getElementById('priority_sort'),
      temp = JSON.parse(JSON.stringify(arr))
    if (elSortByPriority.closest('.active')) {
      temp.sort((a, b) => a.priority.toLowerCase() > b.priority.toLowerCase() ? -1 : 1)
      elSortByPriority.classList.remove('active') }
      else {
        temp.sort((a, b) => a.priority.toLowerCase() > b.priority.toLowerCase() ? 1 : -1)
        elSortByPriority.classList.add('active') 
      }
      displayTasks(temp)
    }
  
    document.getElementById('test_priority').addEventListener('click', () => {
      sortByPriority(todoList)
    })

  // ФИЛЬТР ПО ПРИОРИТЕТУ 

function showSelectedPriority(arr) {
  const dropdown = document.getElementById('filter_prior'),
  temp = JSON.parse(JSON.stringify(arr))
  const newArray = temp.filter(item => {
    
    if (item.priority == dropdown.value) {
      return true
    } else 
    return false
  })
  if (newArray) displayTasks(newArray)
  if (dropdown.value == "allPriority") displayTasks(arr)
  }
  
document.getElementById('filter_prior').addEventListener('change', () => {
  showSelectedPriority(todoList)
})

// ФИЛЬТР ПО ВВОДУ ТЕКСТАц3еЦ3Е

function filterByInput (arr) {
  const input = document.getElementById('filter_input'),
  temp = JSON.parse(JSON.stringify(arr)),
  inputValue = input.value.toLowerCase()
  const filters = document.getElementById('filter_input').value.toLowerCase(),
  elements = document.getElementById('task_list'),
  things = elements.getElementsByClassName('objective'),
  rows = elements.getElementsByClassName('tasks')
  for (let i=0; i<rows.length; i++) {
    (things[i].innerHTML.toLowerCase().indexOf(filters) > -1) ? rows[i].classList.remove('hide') : rows[i].classList.add('hide') 
  }
}
document.getElementById('filter_input').addEventListener('keyup', () => {
  filterByInput(todoList)
})
