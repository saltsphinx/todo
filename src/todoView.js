const $ = require('jquery');
const projectHandler = require('./projectHandler');
const projectView = require('./projectView');
const todoForm = $('.todo-form');
const wrapper = $('.todos > .wrapper');
let selected;
let selectedNode;
let formState = 'create';

const todoViews = {};

(() => {
  const todosButton = $('.todos-button');
  const exitFormButton = $('.exit-todo-form');

  // Case where formState is updating and form does not have hidden class, dont close form
  todosButton.on('click', () => {
    todoForm[0].reset();
    $('#todo-due-date')[0].valueAsDate = new Date();
    if (formState != 'create' && !todoForm.hasClass('hidden'))
    {
    }
    else
    {
      todoForm.toggleClass('hidden');
    }
    selected[0].insertBefore(todoForm[0], selected[0].firstChild);
    todoForm.addClass('create');
    todoForm.removeClass('updating');
    formState = 'create';
  })

  exitFormButton.on('click', () => {
    closeForm();
  })
})();


function loadView(name)
{
  const todoView = todoViews[name];

  if (selected)
  {
    selected.addClass('hidden');
  }

  selected = todoView;
  todoView.removeClass('hidden');
  // attachForm();

  return todoView;
}

function createTodoView(projectName, todos)
{
  if (todoViews[projectName])
  {
    return;
  }

  const todoView = $(`<div class='todoView' id='${projectName}'>`)

  for (i in todos)
  {
    todoView.append(createTodoNode(todos[i]));
  }

  todoViews[projectName] = todoView;
  wrapper.append(todoView);
  return projectName;
}

function removeTodoNode(name)
{
  selected.find(`#${name}`).remove();
}

function removeSelectedView()
{
  detactForm()
  selected.remove();
  console.log(todoViews[Object.keys(todoViews)[0]][0].id);
  loadView(todoViews[Object.keys(todoViews)[0]][0].id);
}

function insertTodoNode(todo, index = 0, prevNode)
{
  const todoNode = prevNode || createTodoNode(todo);

  selected[0].insertBefore(todoNode[0], selected[0].childNodes[index]);
  return todoNode;
}

function detactForm()
{
  wrapper.append(todoForm);
}

function attachForm()
{
  selected.append(todoForm);
}

function createTodoNode(todo)
{
  const todoNode = $(`<div class='todo' id=${todo.name}>`);
  const activeButton = $(`<button class='active-button'>`);
  const namePara = $(`<p class='name'>${todo.name.replaceAll('-', ' ')}</p>`);
  const dueDatePara = $(`<p class='due-date'>${todo.dueDate}</p>`);
  const deletePara = $(`<p class='delete-todo-button hidden'>delete</p>`);

  if (todo.tier <= 0)
  {
    todoNode.addClass('red');
  }

  todoNode.append(activeButton, namePara, dueDatePara, deletePara);
  todoNode.on('dblclick', updateTodoForm);
  todoNode.trigger('dblclick');
  return todoNode;
}

function closeForm()
{
  todoForm.addClass('hidden');
  todoForm[0].reset();
}

function updateTodoForm(event)
{
  const node = event.currentTarget;

  if (node.classList.contains('inactive'))
  {
    return;
  }
  
  selectedNode = node;
  const project = projectHandler.getProject(projectView.selected.id);
  const todo = project.todos.find((todo) => todo.name == node.id);

  $('#todo-name')[0].value = todo.name.replaceAll('-', ' ');
  $('#todo-description')[0].value = todo.description;
  $('#todo-due-date')[0].value = todo.dueDate;
  $('#todo-tier')[0].value = todo.tier;
  moveForm(event.currentTarget);
  formState = 'updating';
  todoForm.removeClass('hidden');
  todoForm.removeClass('create');
  todoForm.addClass('updating');
}

function moveForm(node)
{
  let todoForm = $('.todo-form');
  node.nextSibling ? selected[0].insertBefore(todoForm[0], node.nextSibling) : selected[0].appendChild(todoForm[0]);
}

module.exports = { loadView, createTodoView, insertTodoNode, removeSelectedView, get selected() { return selected }, get formState() { return formState }, get selectedNode() { return selectedNode } };