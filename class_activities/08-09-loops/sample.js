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

let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

let obj = {
  a: 10,
  b: {
    c: "inside",
  },
  c: "bla",
};
console.log(obj);
for (let prop in obj) {
  console.log(prop, obj[prop]);
}

for (let element of arr) {
  console.log(element);
}

let arr2 = [1, 2, 3, 4, "bla", { a: 10 }];
for (let i = 0; i < arr2.length; i++) {
  console.log(i, arr2[i]);
}

console.log(obj);
// "in" for objects and dictionaries. Goes through keys
for (let prop in obj) {
  // We have to check it because some chaining stuff?
  if (obj.hasOwnProperty(prop)) {
    console.log(prop, obj[prop]);
  }
}
obj?.thispropertydoesnotexists?.length;

// "of" for arrays. Goes through elements
for (let element of arr2) {
  console.log(element);
}

let x = 0;
let y = 0;
while (x < 10) {
  console.log("x: ", x++);
  console.log("y: ", ++y);
}

// Also work with numbers
let sentinel = 10;
while (sentinel) {
  console.log(sentinel);
  sentinel--;
}

sentinel = 10;
if (sentinel == "10") {
  console.log("inside the if ==");
} else if (sentinel === 10) {
  console.log("inside the ===");
} else {
  console.log("in the else");
}
