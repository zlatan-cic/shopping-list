const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

// Functions

function displayItems() {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  // Validation Input
  if (newItem === "") {
    alert("Please Add Item");
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  checkUI();

  // to delete text in input
  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create List item
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  let button = createBtn("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
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

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSOM stringset to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
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

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
      // console.log(true);
    } else {
      // console.log(false);
      item.style.display = "none";
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

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();


