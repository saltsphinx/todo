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
  const remove = (todoName) =>
  {
    const todoIndex = todos.findIndex(todo => todo.name == todoName);

    if (todoIndex >= 0)
    {
      return todos.splice(todoIndex, 1)[0];
    }
  }

  //toggles todo's active property. returns nothing if todo doesnt exist, returns index if todo is actived and returns 'inactive' if its been deactived
  const toggle = (todoName) =>
  {
    const todo = remove(todoName);

    if (!todo)
    {
      return;
    }

    const toggleResult = todo.active = !todo.active;

    return toggleResult ? add(todo) : 'inactive';
  }

  return {name, todos, add, remove, toggleTodo};
}

module.exports = ProjectFactory;