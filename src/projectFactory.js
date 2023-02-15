function ProjectFactory(name, id)
{
  const todos = [];
  const add = (todo, index) =>
  {
    let tierIndex = index ? index : this.todos.indexOf(x => x.tier == todo.tier);
    tierIndex == 0 ? todos.unshift(todo) : this._addTodo(todo, tierIndex);

    return tierIndex;
  }

  const toggleTodo = (todoId) =>
  {
    const todo = this.todos.splice(todos.findIndex(x => x.id == todoId), 1)[0];
    todo.toggle();

    const tierIndex = this.todos.indexOf(x => x.tier == todo.tier);

    if (todo.active)
    {
      this.add(todo, tierIndex);
      return tierIndex;
    }
    else
    {
      const inactiveIndex = this.todos.indexOf(x => x.active == false);
      _addTodo(todo, inactiveIndex);

      return inactiveIndex;
    }
  }

  const _addTodo = (todo, index) =>
  {
    const subTodos = todos.splice(index);
    todos.push(todo);

    todos.concat(subTodos);
  }

  return {name, id, todos, add, toggleTodo};
}

module.exports = ProjectFactory;