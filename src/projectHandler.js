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

  if (!projectIndex)
  {
    return false;
  }

  projects.splice(projectIndex, 0);
}

const addTodo = (projectName, name, description, dueDate, tier) =>
{
  const projectIndex = _checkName(projectName);

  if (!projectIndex)
  {
    return false;
  }

  const project = projects[projectIndex];

  const todo = todoFactory(name, description, dueDate, tier);
  return project.add(todo);
}

const removeTodo = (projectID, todoID) =>
{

}

function _checkName(projectName, arr = projects)
{
  const names = projects.map(project => project.name);
  const index = names.findIndex(name => name == projectName);
  console.log(index);

  if (index >= 0)
  {
    return index
  }

  return false;
}

module.exports = {addProject, removeProject, addTodo, removeTodo, projects};