const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

// console.log(itemForm);
// console.log(itemInput);
// console.log(itemList);

// Functions
function addItem(e) {
  e.preventDefault(); 

  let newItem = itemInput.value;

  // Validation Input
  if (newItem === "") {
    alert("Please Add Item");
    return;
  }
  // console.log("SUCCESS:  " + itemInput.value);

  // Create List item
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  // // // // // Testing somting
  // console.log(li.appendChild(document.createTextNode(newItem)));
  // console.log(newItem);
  // // // // //

  let button = createBtn("remove-item btn-link text-red");
  li.appendChild(button)
  // console.log(li);

  itemList.appendChild(li);

  // to delete text in input
  itemInput.value = '';
}

function createBtn(classes) {
  let button = document.createElement('button');
  button.className = classes;
  let icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon)
  return button;
}

function createIcon(classes){
  let icon = document.createElement('i');
  icon.className = classes;
  return icon
}

// Event Listeners

itemForm.addEventListener("submit", addItem);
