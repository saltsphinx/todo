function ProjectFactory(name, id)
{
  const todos = [];
  const add = (todo) =>
  {
    const tierIndex = this.todos.indexOf(x => x.tier == todo.tier);
    tierIndex == 0 ? todos.unshift(todo) : this._addTodo(todo, tierIndex);

    return tierIndex;
  }

  const _addTodo = (todo, index) =>
  {
    const subTodos = todos.splice(index);
    todos.push(todo);

    todos.concat(subTodos);
  }

  return {name, id, todos, add};
}

module.exports = ProjectFactory;