function todoFactory(name, id, description, dueDate, priority)
{
  return {name, description, dueDate, priority, id};
}

module.exports = todoFactory;