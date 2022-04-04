// -----  Global Variables  -----
// Declaring global variables that are used to manipulate the html
const addItemBtn = document.querySelector('.btn--add');
const modalCloseBtn = document.querySelector('.btn--cancel')
const confirmAddBtn = document.querySelector('.btn--confirm--add')
const confirmEditBtn = document.querySelector('.btn--confirm--edit');

/* By using a modal in the form of the dialog element, it provides better accessibility,
and allows for the user to press the escape key to close it without having to do any extra */
const modal = document.querySelector('.modal');

const userInput = document.querySelector('#textInput');
const itemList = document.querySelector('.item__list');

const deleteBtns = document.querySelectorAll('.btn--delete');

// Creating a buffer to hold the event target that has been clicked
// Is explained more thoroughly at the bottom in the itemList event listener
let editBuffer = ' ';

// -----  Functions  -----

/* 
    Function for creating and appending list items
    Uses the document.createElement to create the html elements, and then appends them to DOM
 */
// * Implementation of task 2.1, Add Item to list
const addListItem = input => {
    // Starts off by creating the li and the span.
    const liElem = document.createElement('li');
    const spanElem = document.createElement('span');

    // Sets the innerHTML of the span to the userInput
    spanElem.innerHTML = input;

    // Appends the span with the user input to the li element
    liElem.appendChild(spanElem);

    // Creates the buttons for the li
    const editBtnElem = document.createElement('button');
    const deleteBtnElem = document.createElement('button');

    // Sets the innerHTML of the buttons
    editBtnElem.innerHTML = 'edit';
    deleteBtnElem.innerHTML = 'delete';

    // Adding class to each button for selection and styling
    editBtnElem.classList.add('btn--edit')
    deleteBtnElem.classList.add('btn--delete')

    // Appends the buttons to the li
    liElem.appendChild(editBtnElem);
    liElem.appendChild(deleteBtnElem);

    //Finally appends the list item with the span, userInput and the buttons to DOM
    itemList.appendChild(liElem);

    // Then clears the input field after the user har added an item
    userInput.value = '';

    // Lastly closes the modal with the input field
    modal.close();
}




// -----  Eventlisteners  -----

// Buttons for opening and closing the modal
addItemBtn.addEventListener('click', () => {
    confirmAddBtn.classList.add('show');
    modal.showModal();
})

// * Implemantation of task 1.2b, Cancel button for editing an item
// * Implemantation of task 2.1b, Cancel button for adding an item
modalCloseBtn.addEventListener('click', () => {
    // Clears the content of the input field before closing the modal
    userInput.value = '';

    /* 
        Removes the class 'show' from the buttons.
        This is to make sure there is no button already present when opening the modal again
    */
    confirmAddBtn.classList.remove('show');
    confirmEditBtn.classList.remove('show');

    // Finally closes the modal
    modal.close();
})

// * Implementation of task 2.1a, Confirm button for adding an item
confirmAddBtn.addEventListener('click', () => {
    // Checks if the text field is empty or not using ternary operator
    // Checking if value of userInput is true or false
    // If userInput.value is empty it warns the user that a necessary text field is empty
    // If it evaluates to true the addListItem function is called with userInput.value as an argument
    if (userInput.value) {
        addListItem(userInput.value)
        confirmAddBtn.classList.remove('show');

    } else {
        window.alert('Necessary text field empty')
    }
})

// * Implementation of task 1.2a, Confirm button for editing an item
// * I chose to make the input box appear as a modal on the screen rather than underneath the list because of better accessibility,
// * and so that when there are many items in the list the input field is just as easy to see
confirmEditBtn.addEventListener('click', () => {
    // Sets the innerHTML of the event target buffer to be the value of userInput)
    if(userInput.value) {
        editBuffer.innerHTML = userInput.value;
        modal.close();
        userInput.value = '';
        confirmEditBtn.classList.remove('show');
    } else {
        window.alert('Necessary text field empty');
    }
})


/* 
    Adding an event listener to the whole list
    Checks which element is clicked by comparing the classlist of the element clicked, to the desired class
    This is where the delete and edit button get their functionality from 


    The reason I chose to add an eventListener to the whole list instead of each button is because,
    it would save me the trouble of adding an eventListener each time a new item is added to the list
    Now I just check which class the pressed element has and then compares it to the desired one
*/
itemList.addEventListener('click', e => {
    // Setting the listItem to the target of the event
    const listItem = e.target;


    // * Implementation of task 1.1, Delete button
    // First checks if user has pressed the delete button
    if (listItem.classList[0] === 'btn--delete') {

        // If the delete button was pressed, the user is prompted to confirm their action
        // The window.confirm() method either returns true or false
        // If it returns true the listitem is removed
        // * Implementation of task 1.1a, Confirm if the user wants to remove the item
        if (window.confirm('Are you sure you want to delete this item?')) {
            // Using parentElement because the current listItem variable is only the button element
            // The parent element of the button is the whole list item, which we want to remove
            listItem.parentElement.remove();
        }
    }

    /* 
        The way I solved the edit button was that the confirm button in the modal is different based on which button you pressed previously
        When the user presses the add button the confirmAddBtn gets shown, and when the edit button is pressed the confirmEditBtn is showing. 
        I then have two different eventListeners on each of these buttons, rather then adding and removing the eventlistener itself.
    */
    // * Implementation of task 1.2, Edit Button
    if (listItem.classList[0] === 'btn--edit') {
        // I chose to create an editbuffer so that I can store which element has been clicked when the user presses the edit button
        /* 
            I am using the previousElementSibling method to get the span element inside the li,
            this is because it is the only element I need to manipulate for the edit button to work
        */
        editBuffer = listItem.previousElementSibling;

        // This is where I make the confirm edit button visible in the modal
        confirmEditBtn.classList.add('show');
        // Showing the modal to the user
        modal.showModal();
    }
})