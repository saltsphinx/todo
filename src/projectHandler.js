const projectFactory = require('./projectFactory');
const todoFactory = require('./todoFactory');

const projects = [];

const addProject = (projectName) =>
{
  if (projects.length > 0 && typeof _checkName(projectName) == 'number')
  {
    return false;
  }

  const project = projectFactory(projectName);
  projects.push(project);

  return projectName;
}

const removeProject = (projectName) =>
{
  const projectIndex = _checkName(projectName);

  if (typeof projectIndex === false)
  {
    return false;
  }

  projects.splice(projectIndex, 1);
}

const addTodo = (projectName, todoName, description, dueDate, tier) =>
{
  const projectIndex = _checkName(projectName);

  if (projectIndex === false)
  {
    return false;
  }

  const project = projects[projectIndex];

  if (project.todos.length > 0 && typeof _checkName(todoName, project.todos) == 'number')
  {
    return false;
  }

  const todo = todoFactory(todoName, description, dueDate, tier);
  return project.add(todo);
}

const removeTodo = (projectID, todoID) =>
{

}

function _checkName(name, arr = projects)
{
  const names = projects.map(project => project.name);
  const index = names.findIndex(x => x == name);
  console.log(index);

  if (index >= 0)
  {
    return index
  }

  return false;
}

module.exports = {addProject, removeProject, addTodo, removeTodo, projects};