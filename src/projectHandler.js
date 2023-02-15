const projectFactory = require('./projectFactory');
const todoFactory = require('./todoFactory');

const projects = [];
const exports = {};

exports.addProject = (name) =>
{
  let id;

  do
  {
    id = [name, Math.ceil(Math.random() * 10000)];
  }
  while (_checkID(id));

  const project = projectFactory(name, id);
  projects.push(project);

  return id.join();
}

exports.removeProject = (id) =>
{
  const projectIndex = _checkID(id);

  if (!projectIndex)
  {
    return false;
  }

  projects.splice(projectIndex, 0);
}

exports.addTodo = (projectID, name, description, dueDate, tier) =>
{
  const projectIndex = _checkID(projectID);

  if (!projectIndex)
  {
    return false;
  }

  const project = projects[projectIndex];
  let id;

  do
  {
    id = [name, Math.ceil(Math.random() * 10000)];
  }
  while (_checkID(id, project.todos));

  const todo = todoFactory(name, id, description, dueDate, tier);
  return project.add(todo);
}

function _checkID(id, arr = projects)
{
  const IDs = arr.map(x => x.id);
  return IDs.map(id => id.join()).findIndex(id.join());
}

module.exports = exports;