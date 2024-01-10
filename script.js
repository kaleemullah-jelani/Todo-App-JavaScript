const numberOftodos = document.querySelector('.number-of-todos');
const filterList = document.querySelectorAll('li');
const addBtn = document.querySelector('.btn');
const todosContainer = document.querySelector('.todos-container');
let todoArray = [];

const handleFilter = (index) => {
  let filterArray;
  if (index === 0) return (filterArray = todoArray);
  if (index === 1)
    return (filterArray = todoArray.filter((e) => e.completed === true));
  if (index === 2)
    return (filterArray = todoArray.filter((e) => e.completed === false));
};

filterList.forEach((li, index) => {
  li.addEventListener('click', () => {
    todosContainer.innerHTML = handleFilter(index)
      .map(innerHTMLFunction)
      .join('');
    handleDeleteAndComlete();
    filterList.forEach((otehrList) => {
      if (otehrList !== li) {
        otehrList.classList.remove('active');
      }
    });
    li.classList.add('active');
  });
});

const innerHTMLFunction = (object) => {
  const nameArry = object.nameValue.split(' ');
  let shortName
  if(nameArry.length ===1 ) {
     shortName = nameArry[0].slice(0, 1)
  }else{
   shortName = nameArry[0].slice(0, 1) + nameArry[1].slice(0, 1);
}
  return `
    <div class="todo ${object.completed ? 'completed' : ''}">
        <div class="todo-name-img">
          <div class="img">${shortName.toUpperCase()}</div>
          <div class="name">${object.nameValue}</div>
        </div>
        <div class="todo-title">${object.taskValue}</div>
        <div class="todo-action">
          <div class="delet">
            <img src="./img/delete.svg" alt="" />
          </div>
          <div class="tick">
            <img src="${
              object.completed ? './img/cross.svg' : './img/tick.svg'
            }" alt="" />
          </div>
        </div>
      </div>
    
    `;
};

const handleDeleteAndComlete = () => {
  const btnComplete = document.querySelectorAll('.tick');
  btnComplete.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      todoArray[index].completed = !todoArray[index].completed;
      updateInnerHTMl();
    });
  });

  const deleteBtn = document.querySelectorAll('.delet');
  deleteBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const deletedElement = todoArray[index];
      const ArrayAfterDelete = todoArray.filter((e) => e !== deletedElement);
      todoArray = [...ArrayAfterDelete];
      updateInnerHTMl();
    });
  });
};

const updateInnerHTMl = () => {
  numberOftodos.innerHTML = `Todo(${todoArray.length})`;
  todosContainer.innerHTML = todoArray.map(innerHTMLFunction).join('');
  handleDeleteAndComlete();
};

addBtn.addEventListener('click', () => {
  const nameValue = document.querySelector('.user-name').value;
  const taskValue = document.querySelector('.task').value;
  if(nameValue === '' || taskValue === '' ) return

  const todoObject = {
    nameValue,
    taskValue,
    completed: false,
  };

  todoArray.push(todoObject);
  updateInnerHTMl();
});
updateInnerHTMl()
const getCurrentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minut = date.getMinutes();
  const second = date.getSeconds();
  const day = date.getDate();
  const monthe = date.getMonth();
  const year = date.getFullYear();

  return `${handleTimeAmPm(hour, minut, second)} ${day}/${monthe}/${year} `;
};

const handleTimeAmPm = (hour, minut, second) => {
  if (hour < 12) return hour + ':' + minut + ':' + second + 'AM';
  if (hour > 12) return hour - 12 + ':' + minut + ':' + second + 'PM';
};

const time = document.querySelector('.time');

getCurrentTime();
setInterval(() => {
  time.innerHTML = getCurrentTime();
}, 1000);
