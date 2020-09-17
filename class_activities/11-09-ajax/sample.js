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

setTimeout(() => {
  console.log("Segundo");
}, 0);
// This will be executed first than the request finishes
console.log("request sended");

// Tus "thenables" se ejecutan solo una vez con el primer resolve
// que encuentren en la promesa
let promise_thenable = (result) => {
  debugger;
  console.log("the result" + result);
  return result;
};

// Si todo sale bien en "ajax_promise" se ejecuta el "promise_thenable"
// si sale mal se ejecuta la función que le pasas en el parámetro del catch
// then -->resolve de ajax promise
// catch -->reject de ajax promise
// Puedes concatenar thenables, por si una promesa te regresa una promesa
ajax_promise.then(promise_thenable).catch((err) => {
  return err;
});

export { ajax_promise };
