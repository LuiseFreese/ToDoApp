// get all elements we need later on
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const deleteAllBtn = document.querySelector('.footer button');
const wrapperEl = document.querySelector('.wrapper');
const pendingTasksAmount = document.querySelector('.pendingTasks');

// onkeyup event - get user input, add remove enabled class to add btn accordingly
inputBox.onkeyup = () => {
  let userInput = inputBox.value;
  if (userInput.trim() != 0) {
    addBtn.classList.add('enabled');
  } else {
    addBtn.classList.remove('enabled');
  }
};

//add new task function
const addNewTask = function () {
  let userInput = inputBox.value;
  let getLocalStorageData = localStorage.getItem('new task');
  if (getLocalStorageData == null) {
    //if localStorage has no data
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userInput);
  localStorage.setItem('new task', JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove('enabled');
};

//show task list function
function showTasks() {
  let getLocalStorageData = localStorage.getItem('new task');
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  // display amount of tasks in pending task element
  pendingTasksAmount.textContent = listArray.length;

  if (listArray.length > 0) {
    deleteAllBtn.classList.add('enabled');
  } else {
    deleteAllBtn.classList.remove('enabled');
  }
  let newLiTag = '';
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class='icon' onclick='deleteTask(${index})'><i class='fas fa-check'></i></span></li>`;
  });
  //add new li tag inside ul tag 🤯
  todoList.innerHTML = newLiTag;
  //reset input field
  inputBox.value = '';
}

// delete a single task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem('new task');
  listArray = JSON.parse(getLocalStorageData);

  listArray.splice(index, 1);
  localStorage.setItem('new task', JSON.stringify(listArray));
  showTasks();
}

// delete all tasks function
deleteAllBtn.onclick = function deleteAllTasks() {
  //get localstorage
  let getLocalStorageData = localStorage.getItem('new task');
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
    listArray = [];
  }
  //set the item in localstorage
  localStorage.setItem('new task', JSON.stringify(listArray));
  showTasks();
};

showTasks();
// add addNewTask function to click event on add button
addBtn.addEventListener('click', addNewTask);

// add addNewTask function when hitting ENTER
wrapperEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addNewTask();
  }
});
