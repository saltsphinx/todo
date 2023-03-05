const $ = require('jquery');
const projectHandler = require('./projectHandler');
const projectView = require('./projectView');
const todoView = require('./todoView');
window.projectHandler = projectHandler;
window.projectView = projectView;
window.todoView = todoView;

createProject(null, 'Primary');

(() => {
  const projectForm = $('.project-form');
  const todoForm = $('.todo-form');
  const removeProjectButton = $('.remove-project-button');
  const deleteTodoButton = $('.delete-todo');

  projectForm.on('submit', createProject);
  todoForm.on('submit', todoInteractionEvent);
  removeProjectButton.on('click', removeProject);
  deleteTodoButton.on('click', removeTodo);
})();

function createProject(_, projectName)
{
  const nameInput = $('#project-name')[0];
  const name = projectHandler.addProject(projectName || nameInput.value);

  if (!name)
  {
    return;
  }

  todoView.createTodoView(name, projectHandler.getProject(name).todos);
  todoView.loadView(name);

  const node = projectView.createProjectTemplate(name);
  projectView.loadView(name);
  node.on('click', projectView.select);
  node.on('click', todoView.loadView.bind(this, name));

  projectView.closeForm();
  return name;
}

function todoInteractionEvent()
{
  todoView.formState == 'create' ? createTodo() : updateTodo();
}

function createTodo()
{
  const nameInput = $('#todo-name')[0];
  const todoIndex = projectHandler.addTodo(projectView.selected.id, nameInput.value, $('#todo-description')[0].value, $('#todo-due-date')[0].value, $('#todo-tier')[0].value);

  if (todoIndex === false)
  {
    return;
  }

  const todo = projectHandler.getProject(projectView.selected.id).todos[todoIndex];
  const todoNode = todoView.insertTodoNode(todo, todoIndex);
  
  todoNode.find(`.active-button`).on('click', moveTodo);
  todoNode.find(`.delete-todo-button`).on('click', removeTodoEvent);
}

function updateTodo()
{
  if (!todoView.selectedNode)
  {
    return;
  }

  const nameInput = $('#todo-name')[0];
  const todoIndex = projectHandler.addTodo(projectView.selected.id, nameInput.value, $('#todo-description')[0].value, $('#todo-due-date')[0].value, $('#todo-tier')[0].value);
  console.log(todoIndex);
  if (todoIndex === false)
  {
    return;
  }

  todoView.selectedNode.remove()
  const todo = projectHandler.getProject(projectView.selected.id).todos[todoIndex];
  const node = todoView.insertTodoNode(todo, todoIndex);
  node.trigger('dblclick');
}

function removeTodo()
{
  if (projectHandler.removeTodo(projectView.selected.id, todoView.selectedNode.id, todoView.selectedNode.classList.contains('inactive') ? false : true))
  {
    todoView.selectedNode.remove();
    $('.todo-form').addClass('hidden')
  }
}

function removeTodoEvent(event)
{
  const todoNode = event.target.parentNode; 
  if (projectHandler.removeTodo(projectView.selected.id, todoNode.id, todoNode.classList.contains('inactive') ? false : true))
  {
    todoNode.remove();
    $('.todo-form').addClass('hidden');
  }
}

function moveTodo(event)
{
  const todoNode = event.target.parentNode;
  
  const result = projectHandler.toggleTodo(projectView.selected.id, todoNode.id, todoNode.classList.contains('inactive') ? false : true);

  if (result === undefined)
  {
    return;
  }

  if (typeof result == 'number')
  {
    todoNode.classList.remove('inactive')
    todoView.insertTodoNode(null, result, $(todoNode))
  }
  else
  {
    $(todoNode).insertAfter(todoView.selected.children('.todo:not(.inactive)').last());
    todoNode.classList.add('inactive');
    $('.todo-form').addClass('hidden');
  }
}

function removeProject()
{
  if (projectHandler.projects.length <= 1)
  {
    alert('You must have at least one project.')
    return;
  }

  const id = projectView.selected.id;

  projectHandler.removeProject(id);
  projectView.removeView()
  todoView.removeSelectedView();
  $('.projects .wrapper > *').first().trigger('click');
}