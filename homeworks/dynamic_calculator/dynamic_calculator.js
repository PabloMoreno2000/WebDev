const item_list = "item_list";
let total = 0;

function get_element_li(name, price) {
  return `<li class="added-item">name: ${name} price: <span class="span-price">${price}</span><button class="remove-item">remove</button></li>`;
}

let add_item_to_list_with_template = (template_function) => {
  return (event) => {
    // add the item to the list
    const item_name = document.getElementById("item-name").value;
    const item_value = parseFloat(document.getElementById("item-value").value);
    if (item_value != NaN) {
      const new_item_element = template_function(item_name, item_value);
      document.getElementById(item_list).innerHTML += new_item_element;

      // Add event listener to the button inside the element just added with the remove_item function
      let remove_buttons = document.getElementsByClassName("remove-item");
      // Can't just add remove_listener to last element, it wasn't working like that
      for (let i = 0; i < remove_buttons.length; i++) {
        remove_buttons[i].addEventListener("click", (event) =>
          remove_item(event.target.parentNode)
        );
      }

      // Add the value to the total
      total += item_value;
      document.getElementById("total").innerHTML = `Total: ${total}`;
    }
  };
};
/*
   for removing elements could be this way
    let element_to_delete = document.querySelector("selector").lastElementChild;
    element_to_delete.parentNode.removeChild(element_to_delete);
    or we could use ChildNode.remove()
    https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
  */

// node_to_remove is a <li> element
let remove_item = (node_to_remove) => {
  const list_of_items = document.getElementById(item_list);
  // The first item of each appended <li> element, is a span that has just the number
  const span_price = node_to_remove.children[0].innerHTML;
  const removed_value = parseFloat(span_price);
  // Subtract the value of the removed item and update
  total -= removed_value;
  document.getElementById("total").innerHTML = `Total: ${total}`;
  list_of_items.removeChild(node_to_remove);
};

// When the DOM is loaded
document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("total").innerHTML = "Total: 0";
  // Create a function by currification
  const event_handler = add_item_to_list_with_template(get_element_li);
  // Add an element each time the "add" button is clicked
  document.getElementById("add-item").addEventListener("click", event_handler);
});
