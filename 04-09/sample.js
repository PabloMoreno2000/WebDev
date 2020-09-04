console.log("inside my file");
my_second_var = 20;
console.log(my_second_var);

function my_first_fun(arg_one, arg_two) {
  console.log(arg_one, arg_two);
}

my_first_fun(10, "blaaa");

let sec_fun = function (arg_one, arg_two = "holaaa") {
  console.log(arg_one, arg_two);
};

let arr_fun = () => {
  console.log("inside my arr fun");
};

((x) => {
  console.log(x);
})(100);

function identity(price) {
  return price;
}

function double_price(price) {
  return price * 2;
}

function discount_exec(price_cal, price) {
  return price * 0.7;
}

function my_curr(x) {
  return function (y) {
    console.log(`${x}  ${y}`);
  };
}

let fun = my_curr("hello");
fun("juve");
fun("pablo");
let fun_2 = my_curr("hallo");
fun_2("juve");
fun_2("pablo");

function get_li_template(name, price) {
  return `<li class="added-item">name: ${name} price: ${price}</li>`;
}

function get_li_template_special(name, price) {
  return `<li class="added-item">name: ${name} price: ${price} special</li>`;
}

console.log(discount_exec(identity, 100));
console.log(discount_exec(double_price, 100));
let item_creator = (template_creator) => {
  return (event) => {
    console.log(event);
    let item_name = document.querySelector("#items").value;
    let item_price = document.querySelector("#price").value;
    let template = template_creator(item_name, item_price);
    console.log(template);
    document.getElementById("list-items").innerHTML += template;
  };
};
let event_handler = item_creator(get_li_template_special);
//DOMContentLoaded
document.addEventListener("DOMContentLoaded", function (event) {
  console.log("more bla bla");
  document.getElementById("add-item").addEventListener("click", event_handler);

  let change_color_event_handler = (color) => {
    return (event) => {
      let node = document.querySelector("#container");
      node.className = color;
    };
  };

  let red = (event) => {
    // debugger
    let node = document.querySelector("#container");
    node.className = "red";
  };

  let blue = (event) => {
    // debugger
    let node = document.querySelector("#container");
    node.className = "blue";
  };

  // let blue_gen = change_color_event_handler("blue")
  // let red_gen = change_color_event_handler("red")

  document
    .getElementById("button-red")
    .addEventListener("click", change_color_event_handler("red"));
  // debugger
  document
    .getElementById("button-blue")
    .addEventListener("click", change_color_event_handler("blue"));
  // <button id="button-red">change to red</button>
  // <button id="button-blue">change to blue</button>
  document.querySelector("#items").addEventListener("keyup", (event) => {
    console.log(event.value);
  });
});

let basic_operations = {
  add: (a, b) => {
    return a + b;
  },
  time: (a, b) => {
    return a * b;
  },
};
