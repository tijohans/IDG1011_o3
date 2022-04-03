// -----  Global Variables  -----
// Declaring global variables that are used to manipulate the html
const addItemBtn = document.querySelector('.btn--add');
const modalCloseBtn = document.querySelector('.btn--cancel')
const confirmBtn = document.querySelector('.btn--confirm')

const modal = document.querySelector('.modal');

const userInput = document.querySelector('#textInput');
const itemList = document.querySelector('.item__list');

// -----  Functions  -----

// Function for creating and appending list items
// Uses the document.createElement to create the html elements, and then appends them to DOM
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