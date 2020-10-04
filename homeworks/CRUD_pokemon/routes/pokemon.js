const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const cardTypes = ["pokemon", "item", "price", "element"];
const cards = {};
// Assign each card type as an empty arrayto the object of cards
//cardTypes.map((cardType) => {
//cards[cardType] = [];
//});
// This is an id counter
let id = 0;

// @desct Creates and returns a new card
router.post(
  "/create",
  [
    check("name", "Please insert a name for the card").exists(),
    check("type", "Please insert a valid type for this card").isIn(cardTypes),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const name = req.body.name;
    const type = req.body.type;
    let desct = req.body.desct;
    // "desct" attribute is not needed just if type is pokemon
    if (!desct && type != "pokemon") {
      return res
        .status(400)
        .json({ msg: "desct needed por non-pokemon cards" });
    }

    // Check there's no other card with the same name
    for (let key in cards) {
      if (cards.hasOwnProperty(key) && cards[key].name == name) {
        return res.status(400).json({ msg: "Card name already exists" });
      }
    }

    // The description of a pokemon card is the pokemon itself
    if (type == "pokemon") {
      try {
        let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        // Some pokemons have hundreds of moves, each with a lot of info, let's keep just some of them
        let movesCount = Math.min(3, resp.data.moves.length);
        resp.data.moves = resp.data.moves.slice(0, movesCount);
        // game indices are not needed here
        delete resp.data.game_indices;
        // Won't use these sprites
        if (resp.data.sprites.versions) {
          delete resp.data.sprites.versions;
        }
        desct = resp.data;
      } catch (error) {
        return res.status(400).json({ msg: "Invalid pokemon name" });
      }
    }

    // Remember this is the same as {"name": name, "desct": desct...}
    cards[id] = { id, name, desct, type };
    // Return the card
    res.json(cards[id]);
    // Increase counter for next card
    id++;
  }
);

// @desct Returns a card by its id
router.get("/get/:id", (req, res) => {
  let idRequested = req.params.id;
  let card = cards[idRequested];
  if (card) {
    res.json(card);
  } else {
    return res.status(404).json({ msg: "Card not found" });
  }
});

// @desct Returns all cards within the server
router.get("/getAll", (req, res) => {
  res.json(cards);
});

// @desct Updates the information of an existing card
router.put(
  "/update/:id",
  [
    check("name", "Please insert a name for the card").exists(),
    check("desct", "Please insert a description(desct) for the card").exists(),
    check("type", "Please insert a type for this card").isIn(cardTypes),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, desct, type } = req.body;
    let idRequested = req.params.id;
    let card = cards[idRequested];

    // Check there's no other card with the same name that's not the one being updated
    for (let key in cards) {
      if (
        cards.hasOwnProperty(key) &&
        cards[key].name == name &&
        key != idRequested
      ) {
        return res.status(400).json({ msg: "Card name already exists" });
      }
    }

    if (card) {
      cards[idRequested] = { idRequested, name, desct, type };
      res.json(cards[idRequested]);
    } else {
      return res.status(404).json({ msg: "Card not found" });
    }
  }
);

// @desct Deletes an existing card by its id
router.delete("/delete/:id", (req, res) => {
  let idRequested = req.params.id;
  let card = cards[idRequested];
  if (card) {
    delete cards[idRequested];
    res.json({ msg: "Card successfully deleted" });
  } else {
    return res.status(404).json({ msg: "Card not found" });
  }
});

module.exports = router;
