function todoFactory(name, id, description, dueDate, tier)
{
  const toggle = () => !this.active;
  
  return {name, description, dueDate, tier, id, toggle, active: true};
}

module.exports = todoFactory;