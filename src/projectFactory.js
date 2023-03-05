function ProjectFactory(name)
{
  const todos = [];
  const inactiveTodos = [];

  // Adds todo object to todos array in the appreiate tier/place in array. Returns index todo was placed in
  const add = (todo) =>
  {
    todos.push(todo);
    todos.sort((a, b) => a.tier >= b.tier);

    return todos.indexOf(todo);
  }

  //removes todo and returns it
  const remove = (todoName, active) =>
  {
    const todoIndex = active ? todos.findIndex(todo => todo.name == todoName) : inactiveTodos.findIndex(todo => todo.name == todoName);

    if (todoIndex >= 0)
    {
      return active ? todos.splice(todoIndex, 1)[0] : inactiveTodos.splice(todoIndex, 1)[0];
    }
  }

  //toggles todo's active property. returns nothing if todo doesnt exist, returns index if todo is actived and returns 'inactive' if its been deactived
  const toggle = (todoName, active) =>
  {
    const todo = remove(todoName, active);
    if (!todo)
    {
      return;
    }

    todo.active = !todo.active;

    if (todo.active === true)
    {
      return add(todo);
    }
    else
    {
      inactiveTodos.unshift(todo);
      return 'inactive';
    }
  }

  return {name, todos, inactiveTodos, add, remove, toggle};
}

module.exports = ProjectFactory;