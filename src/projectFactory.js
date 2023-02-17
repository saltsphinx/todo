function ProjectFactory(name)
{
  const todos = [];
  const inactive = [];

  // Adds todo object to todos array in the appreiate tier/place in array. Returns index todo was placed in
  const add = (todo) =>
  {
    todos.push(todo);
    todos.sort();

    return todos.findIndex(todo);
  }

  //removes todo and returns it
  const remove = (todoName, active) =>
  {
    const todoIndex = active ? todos.findIndex(todo => todo.name == todoName) : inactive.findIndex(todo => todo.name == todoName);
     

    if (todoIndex >= 0)
    {
      return todoIndex = active ? todos.splice(todoIndex, 1)[0] : inactive.splice(todoIndex, 1)[0];
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

    const toggleResult = todo.active = !todo.active;

    if (toggleResult)
    {
      return add(todo);
    }
    else
    {
      inactive.unshift(todo);
      return 'inactive';
    }
  }

  return {name, todos, inactive, add, remove, toggle};
}

module.exports = ProjectFactory;