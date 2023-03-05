const projectFactory = require('./projectFactory');
const todoFactory = require('./todoFactory');

const projects = [];

const addProject = (projectName) =>
{
  projectName = projectName.replaceAll(' ', '-');
  if (projects.length > 0 && _getIndex(projectName) >= 0)
  {
    return false;
  }

  const project = projectFactory(projectName);
  projects.push(project);

  return projectName;
}

const getProject = (projectName) =>
{
  return projects.find((project => project.name == projectName));
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
  const project = getProject(projectName)

  if (!project)
  {
    return;
  }

  todoName = todoName.replaceAll(' ', '-');

  if (project.todos.length > 0 && _getIndex(todoName, project.todos) >= 0 || _getIndex(todoName, project.inactiveTodos) >= 0)
  {
    return false;
  }

  const todo = todoFactory(todoName, description, dueDate, tier);
  const todoIndex = project.add(todo);
  return todoIndex;
}

const removeTodo = (projectName, todoName, active) =>
{
  const project = getProject(projectName)

  if (!project)
  {
    return;
  }

  return project.remove(todoName, active);
}

const toggleTodo = (projectName, todoName, active) =>
{
  const project = getProject(projectName)

  if (!project)
  {
    return;
  }

  return project.toggle(todoName, active);
}

// returns index of project or todo if name para is found, returns nothing if it isnt present in arr
// returns -1 if name isnt found
function _getIndex(name, arr = projects)
{
  const names = arr.map(x => x.name);

  return index = names.indexOf(name);
}

module.exports = {addProject, removeProject, toggleTodo, addTodo, removeTodo, getProject, projects};