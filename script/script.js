'use strict';

const todoControl = document.querySelector('.todo-control'),
	  headerInput = document.querySelector('.header-input'),
	  todoList = document.querySelector('.todo-list'),
	  todoComplete = document.querySelector('.todo-completed');

let todoData = [];
const parseJson = function() {
	let storageJson = localStorage.getItem('json');
	console.log(storageJson);
	if (storageJson === null) {
		return;
	} else {
		 todoData = JSON.parse(storageJson);
	}
};
parseJson();

const render = function() {
	todoList.textContent = '';
	todoComplete.textContent = '';
	todoData.forEach(function(item, index){
		const li = document.createElement('li');
			li.classList.add('todo-item');
			li.innerHTML = `
					<span class="text-todo">${item.value}</span>
					<div class="todo-buttons">
						<button class="todo-remove"></button>
						<button class="todo-complete"></button>
					</div>`;
					if (item.completed) {
						todoComplete.append(li);
					} else {
						todoList.append(li);
					}
			const btnTodoCompleted = li.querySelector('.todo-complete'),
				  btnTodoRemove = li.querySelector('.todo-remove');

			btnTodoCompleted.addEventListener('click', function() {
				item.completed = !item.completed;
				render();
			});

			btnTodoRemove.addEventListener('click', function() {
				todoData.splice(index, 1);
				render();
			});
	});
	let json = JSON.stringify(todoData);
	localStorage.setItem('json',json);
};

todoControl.addEventListener('submit', function(event){
	event.preventDefault();
	if (headerInput.value !== '') {
		const newTodo = {
			value: headerInput.value,
			completed: false
		}
		todoData.push(newTodo);
		headerInput.value = '';
		render();
	}
});

render();
