my_second_var = 20; //Definida en html, se puede modificar en js
function my_first_fun(arg_one, arg_two) {
  console.log(arg_one, arg_two);
}

// Puedes poner defaults value para argumentos, o tú asignarlos
let sec_fun = function (arg_one, arg_two = "nice") {
  console.log(arg_one, arg_two);
};

my_first_fun("fff", 10);
sec_fun("aaa", 30);
sec_fun("bbb");

let arr_fun = () => {
  console.log("inside my arr fun");
};

///
function identity(price) {
  return price;
}

function double_price(price) {
  return price * 2;
}

// También puedes mandar de parámetro otra función
function discount_executor(price_cal, price) {
  return price_cal(price) * 0.7;
}

console.log(discount_executor(identity, 100));
console.log(discount_executor(double_price, 200));
////

///
// Currificación
function my_curr(x) {
  return function (y) {
    console.log(`${x} ${y}`);
  };
}
// x ya es una función
let x = my_curr("Hello");
console.log(x("Pablo"));
console.log(x("You"));
///

function get_li_template(name, price) {
  return `<li class="added-item">name: ${name} price:${price}</li>`;
}

let item_creator = (template_creator) => {
  return (event) => {
    console.log(event);
    // selector by id
    let item_name = document.querySelector("#items").value;
    let item_price = document.querySelector("#price").value;
    let template = template_creator(item_name, item_price);
    console.log(template);
    // Se agrega como si fuese todo el texto
    let element_list = document.createElement("li");
    document.getElementById("list-items").innerHTML += template;
    debugger;
  };
};

// Es un listener que se ejecuta cuando le das click al lugar de ponerle
// el atributo onClick al botón en htmls
let event_handler = item_creator(get_li_template);
document.getElementById("add-item").addEventListener("click", event_handler);
