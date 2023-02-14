function todoFactory(name, id, description, dueDate, priority)
{
  return {name, description, dueDate, priority};
}

module.exports = todoFactory;