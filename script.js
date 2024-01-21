var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

itemsArray.forEach(addTask);

function addTask(text) {
  const li = document.createElement('li')
  li.textContent = text;
  ul.appendChild(li);
  createEditButton(li); // Add edit button for each existing task
}

function createEditButton(li) {
  var editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  li.appendChild(editBtn);
  editBtn.addEventListener("click", editListItem);
}

function editListItem() {
  var li = this.parentElement;
  var newText = prompt("Edit task:", li.textContent.trim());
  
  if (newText !== null) {
    li.textContent = newText;
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  itemsArray = Array.from(ul.children).map(function (li) {
    return li.textContent;
  });
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

function del() {
  localStorage.clear();
  ul.innerHTML = '';
  itemsArray = [];
}

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

function createListElement() {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  createEditButton(li); // Add edit button for the new task
  input.value = "";

  function crossOut() {
    li.classList.toggle("done");
    updateLocalStorage();
  }

  li.addEventListener("click", crossOut);

  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  function deleteListItem() {
    li.classList.add("delete");
    updateLocalStorage();
  }
}

function addListAfterClick() {
  if (inputLength() > 0) {
    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    createListElement();
  }
}
var clearListButton = document.getElementById("clearList");
clearListButton.addEventListener("click", clearList);

function clearList() {
  localStorage.clear();
  ul.innerHTML = '';
  itemsArray = [];
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);