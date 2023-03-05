function todoFactory(name, description, dueDate, tier)
{
  const toggle = () => this.active = this.active == true ? false : true;
  
  return {name, description, dueDate, tier, toggle, active: true};
}

module.exports = todoFactory;