const $ = require('jquery');
const projectsWrapper = $('.projects > .wrapper')[0];
let selected;
window.$ = $;

(() => {
  const projectsButton = $('.projects-button');
  const exitFormButton = $('.exit-project-form');
  const projectForm = $('.project-form');

  projectsButton.on('click', () => {
    projectForm.toggleClass('hidden');
  })

  exitFormButton.on('click', () => {
    closeForm();
  })
})();

// create project node for view, returns node
function createProjectTemplate(name)
{
  const projectNode = $(`<div class='project' id=${name}>`);
  const p = $('<p>');
  p.text(name.replaceAll('-', ' '));
  
  projectNode.append(p);
  projectNode.appendTo($('.projects > .wrapper'));

  return projectNode;
}

function select(event)
{
  const target = event.currentTarget;
  loadView(target.id);
}

function loadView(name)
{
  const node = Array.from(projectsWrapper.childNodes).find((button) => button.id == name);

  if (!node)
  {
    return;
  }
  
  if (selected)
  {
    selected.classList.remove('selected');
  }

  selected = node;
  node.classList.add('selected');
}

function closeForm()
{
  const projectForm = $('.project-form');

  projectForm.addClass('hidden');
  projectForm[0].reset();
}

function removeView()
{
  selected.remove();
}

module.exports = { createProjectTemplate, loadView, closeForm, select, removeView, get selected() { return selected } };