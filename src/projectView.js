const $ = require('jquery');
let selected;
window.$ = $;

// create project node for view, returns node
function createProjectTemplate(name)
{
  const projectNode = $(`<div class='project' id=${name}>`);
  const p = $('<p>');
  p.text(name);
  
  projectNode.append(p);
  projectNode.appendTo($('.projects'));
  projectNode.on('click', select);

  return projectNode[0];
}

function select(event)
{
  const target = event.currentTarget;
  loadView(target);
}

function loadView(node)
{
  console.log(node);
  if (selected)
  {
    selected.classList.remove('selected');
  }

  selected = node;
  node.classList.add('selected');
}

module.exports = { createProjectTemplate, loadView, selected };