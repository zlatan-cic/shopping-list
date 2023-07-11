const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

// console.log(itemForm);
// console.log(itemInput);
// console.log(itemList);

// Functions
function addItem(e) {
  e.preventDefault();

  let newItem = itemInput.value;
  // console.log(newItem);

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
  li.appendChild(button);
  // console.log(li);

  itemList.appendChild(li);

  checkUI();

  // to delete text in input
  itemInput.value = "";
}

function createBtn(classes) {
  let button = document.createElement("button");
  button.className = classes;
  let icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  let icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    const listItem = e.target.parentElement.parentElement;
    const itemText = listItem.firstChild.textContent;
    if (confirm(`Are you shure you whant to remove:  ${itemText}`)) {
      listItem.remove();

      checkUI();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  let text = e.target.value.toLowerCase();
  // console.log(text);

  items.forEach((item) => {
    // console.log(item);
    let itemName = item.firstChild.textContent.toLocaleLowerCase();
    // console.log(itemName);

    if(itemName.indexOf(text) != -1){
      item.style.display = 'flex'
      // console.log(true);
    } else {
      // console.log(false);
      item.style.display = 'none'
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  // console.log(items);

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI();
