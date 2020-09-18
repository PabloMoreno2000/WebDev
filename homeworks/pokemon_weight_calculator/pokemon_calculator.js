const pokemon_list = "item_list";
const add_pokemon = "add-pokemon";
const pokemon_input = "pokemon-input";
let total_weight = 0;
let pokemon_count = 0;

let get_pokemon_promise = (pokemonName) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemonName}`, true);
    // Gets executed when readyState changes even if it is not a 4 state
    req.onreadystatechange = (req_event) => {
      console.log("inside the event handler of the request");
      // If request finished / received the answer
      if (req.readyState == 4) {
        // If it finished fine
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          return reject(req.reject);
        }
      }
    };
    req.send(null);
  });
};

let get_pokemon_card = (name, weight, photo) => {
  let li = document.createElement("li");
  li.className = "list-group-item pokemon";

  // Image of the card
  let image = document.createElement("img");
  image.className = "card-img-top";
  image.src = photo;

  let cardBody = document.createElement("div");

  // Card body title
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.append(document.createTextNode(name));
  // Card body text (weight)
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  let spanWeight = document.createElement("span");
  spanWeight.className = "pokemon-weight";
  spanWeight.append(document.createTextNode(weight));

  cardBody.append(cardTitle);
  cardBody.append(document.createTextNode("Weight: "));
  cardBody.append(spanWeight);

  // Button to delete
  let button = document.createElement("button");
  button.className = "btn btn-danger";
  button.append(document.createTextNode("Delete"));

  // Create the card and put everything inside
  let card = document.createElement("div");
  card.className = "card";
  card.style = "width: 18rem; margin-bottom: 1em;";
  card.append(image);
  card.append(cardBody);

  button.addEventListener("click", (event) => {
    // Remove weight and card when deleted
    total_weight -= weight;
    document.getElementById(pokemon_list).removeChild(card);
    document.getElementById(
      "total"
    ).innerHTML = `Total weight: ${total_weight}`;

    pokemon_count--;
    // If there are no pokemons left, hide the pokemons title of the list
    if (pokemon_count == 0) {
      document.getElementById(pokemon_list).style.visibility = "hidden";
    }
  });
  card.append(button);

  // Add the weight of the pokemon to the sum
  total_weight += weight;
  document.getElementById("total").innerHTML = `Total weight: ${total_weight}`;

  return card;
};

function show_timed_alert(isSuccess, duration) {
  let alarm_div = document.getElementById("alarm-space");
  let alarm = NaN;
  let alarm_id = "alarm";

  if (isSuccess) {
    alarm = `<div id="${alarm_id}" class="alert alert-success" role="alert"> <strong>Bien!</strong> Pokemon agregado</div>`;
  } else {
    alarm = `<div id="${alarm_id}" class="alert alert-warning" role="alert"> Favor de checar el nombre del pokemon e intentar de nuevo</div>`;
  }

  alarm_div.insertAdjacentHTML("beforeend", alarm);
  setTimeout(() => {
    while (alarm_div.firstChild) {
      alarm_div.removeChild(alarm_div.firstChild);
    }
  }, duration);
}

function insert_pokemon_element_with_template(pokemonName, template_function) {
  let promise_thenable = (result) => {
    document.getElementById(pokemon_list).style.visibility = "visible";
    result = JSON.parse(result);
    let weight = result.weight;
    let sprite = result.sprites.front_default;
    let cardNode = template_function(pokemonName, weight, sprite);
    document.getElementById(pokemon_list).append(cardNode);
    pokemon_count++;
    show_timed_alert(true, 1500);
    return result;
  };

  get_pokemon_promise(pokemonName)
    .then(promise_thenable)
    .catch((err) => {
      show_timed_alert(false, 1500);
      return err;
    });
}

// When the DOM is loaded
document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("total").innerHTML = "Total weight: 0";

  document.getElementById(add_pokemon).addEventListener("click", (event) => {
    pokeName = document
      .getElementById(pokemon_input)
      .value.trim()
      .toLowerCase();
    insert_pokemon_element_with_template(pokeName, get_pokemon_card);
  });
});
