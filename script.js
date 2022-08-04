const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  //your code here
  if (inputAdd.value == "") {
    return alert("input cant be empty");
  } else {
    addTodo(inputAdd.value, 0);
    inputAdd.value = "";
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  todoCtn.prepend(div);
  div.append(span);
  div.append(doneBtn);
  div.append(deleteBtn);
  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";
  saveTodo();

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "";
      saveTodo();
    } else {
      span.style.textDecoration = "line-through";
      saveTodo();
    }
  };
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  //append todo to HTML...
  //define buttons event...
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }
  console.log(data);
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoListData", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr);

  for (const todoObj of data.reverse()) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
