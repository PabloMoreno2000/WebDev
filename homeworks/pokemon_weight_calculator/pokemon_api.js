function insert_pokemon_element(pokemonName) {
  let ajax_promise = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", "https://pokeapi.co/api/v2/pokemon/ditto", true);
    // Gets executed when readyState changes even if it is not a 4 state
    req.onreadystatechange = (req_event) => {
      console.log("inside the event handler of the request");
      debugger;
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

  let promise_thenable = (result) => {
    debugger;
    console.log("the result" + result);
    return result;
  };

  ajax_promise.then(promise_thenable).catch((err) => {
    return err;
  });
}
