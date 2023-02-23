const projectFactory = require('./projectFactory');
const todoFactory = require('./todoFactory');

const projects = [];

const addProject = (projectName) =>
{
  if (projects.length > 0 && _getIndex(projectName) == -1)
  {
    return false;
  }

  const project = projectFactory(projectName);
  projects.push(project);

  return projectName;
}

const removeProject = (projectName) =>
{
  const projectIndex = _getIndex(projectName);

  if (projectIndex >= 0)
  {
    projects.splice(projectIndex, 1);
  }
}

const addTodo = (projectName, todoName, description, dueDate, tier) =>
{
  const projectIndex = _getIndex(projectName);

  if (projectIndex < 0)
  {
    return false;
  }
  const project = projects[projectIndex];

  if (project.todos.length > 0 && _getIndex(todoName, project.todos) >= 0)
  {
    return false;
  }

  const todo = todoFactory(todoName, description, dueDate, tier);
  return project.add(todo);
}

const changeTodo = (projectName, todoName, newTodoName, description, dueDate, tier, active = true) =>
{
  removeTodo(projectName, todoName, active);
  return addTodo(projectName, newTodoName, description, dueDate, tier);
}

const removeTodo = (projectName, todoName, active) =>
{
  const projectIndex = _getIndex(projectName);

  if (projectIndex)
  {
    return false;
  }

  const project = projects[projectIndex];

  return project.remove(todoName, active);
}

// returns index of project or todo if name para is found, returns nothing if it isnt present in arr
// returns -1 if name isnt found
function _getIndex(name, arr = projects)
{
  const names = arr.map(x => x.name);

  return index = names.indexOf(name);
}

module.exports = {addProject, removeProject, addTodo, changeTodo, removeTodo, projects};