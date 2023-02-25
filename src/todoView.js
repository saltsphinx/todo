const $ = require('jquery');
const wrapper = $('.todos > .wrapper');
let selected;

const todoViews = {};

function loadView(name)
{
  const todoView = todoViews[name];

  if (selected)
  {
    selected.addClass('hidden');
  }

  selected = todoView;
  todoView.removeClass('hidden');

  return todoView;
}

function createTodoView(projectName, todos)
{
  if (todoViews[projectName])
  {
    return;
  }

  const todoView = $(`<div class='todoView'>`);

  for (todo in todos)
  {
    const todoNode = $(`<div class='todo hidden' id=${todo.name}>`);
    const activeButton = $(`<button class='active-button'>`);
    const namePara = $(`<p>${todo.name}</p>`);
    const dueDatePara = $(`<p>${todo.dueDate}</p>`);

    if (todo.tier >= 0)
    {
      todoNode.addClass('red');
    }

    todoNode.append(activeButton, namePara, dueDatePara);
    todoView.append(todoNode);
  }

  todoViews[projectName] = todoView;
  return todoView;
}

module.exports = {loadView, createTodoView};