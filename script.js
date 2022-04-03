// -----  Global Variables  -----
// Declaring global variables that are used to manipulate the html
const addItemBtn = document.querySelector('.btn--add');
const modalCloseBtn = document.querySelector('.btn--cancel')
const confirmBtn = document.querySelector('.btn--confirm')

const modal = document.querySelector('.modal');

const userInput = document.querySelector('#textInput');
const itemList = document.querySelector('.item__list');

const deleteBtns = document.querySelectorAll('.btn--delete');

// -----  Functions  -----

/* 
    Function for creating and appending list items
    Uses the document.createElement to create the html elements, and then appends them to DOM
 */
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

    // Adding class to each button
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
    modal.showModal();
})

modalCloseBtn.addEventListener('click', () => {
    modal.close();
})

confirmBtn.addEventListener('click', () => {
    addListItem(userInput.value);
})

// Adding an event listener to the whole list
// Checks which element is clicked by comparing the classlist of the element clicked, to the desired class
itemList.addEventListener('click', e => {
    // Setting the listItem to the target of the event
    const listItem = e.target;

    // First checks if user has pressed the delete button
    if(listItem.classList[0] === 'btn--delete') {

        // If the delete button was pressed, the user is prompted to confirm their action
        // The window.confirm() method either returns true or false
        // If it returns true the listitem is removed
        if(window.confirm()) {
            // Using parentElement because the current listItem variable is only the button element
            // The parent element of the button is the whole list item, which we want to remove
            listItem.parentElement.remove();
        }
    }

    if(listItem.classList[0] === 'btn--edit') {
        console.log(listItem);
    }
})