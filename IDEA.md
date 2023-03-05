Today's Agenda
1. write psudeo code/plan for the next large blocks of the project
2. work on the todo section/any one two blocks that are todo obj related

Create the form for the todo section
it should:
  - both be able to submit and update todos
  - be the sole todo form
  - when creating todo, move to top of todo's and change a
    state variable to 'create,' when updating a todo, move underneath todo and change state to 'updating' and recieving todo object information
  - be revealed either by clicking the create todo button or by
    double clicking a todo
  - when in updating, depend on selected property in todoView
    module
  - have a closing button that erases form field data
  - When updating node, should be temparily removed from wrapper

Create todo nodes on form submission or project load
they should:
  - have a double click event that changes selected property to
    it's ID, change form data fields to match it's properties,
    reposition form underneath itself and reveal it by removing
    hidden class
  - have the active button activate and deactive it