const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Card = require("../models/Card");

const cardTypes = ["pokemon", "item", "price", "element"];

// @desct Creates and returns a new card
router.post(
  "/create",
  [
    check("name", "Please insert a name for the card").exists(),
    check("type", "Please insert a valid type for this card").isIn(cardTypes),
  ],
  async (req, res) => {
    try {
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
      let card = await Card.findOne({ name });
      if (card) {
        return res.status(400).json({ msg: "Card name already exists" });
      }

      // The description of a pokemon card is the pokemon itself
      if (type == "pokemon") {
        try {
          let resp = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          // Some pokemons have hundreds of moves, each with a lot of info, let's keep just some of them
          let movesCount = Math.min(3, resp.data.moves.length);
          resp.data.moves = resp.data.moves.slice(0, movesCount);
          // game indices are not needed here
          delete resp.data.game_indices;
          // Won't use these sprites
          if (resp.data.sprites.versions) {
            delete resp.data.sprites.versions;
          }
          // Stringify the json to fit the mongoose schema
          desct = JSON.stringify(resp.data);
        } catch (error) {
          return res.status(400).json({ msg: "Invalid pokemon name" });
        }
      }

      // Remember this is the same as {"name": name, "desct": desct...}
      card = new Card({ name, desct, type });
      await card.save();
      // Return the card
      res.json(card);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ msg: "Invalid data" });
    }
  }
);

// @desct Returns a card by its id
router.get("/get/:id", async (req, res) => {
  let card = await Card.findById(req.params.id);
  try {
    if (card) {
      res.json(card);
    } else {
      return res.status(404).json({ msg: "Card not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "Invalid card id" });
  }
});

// @desct Returns all cards within the server
router.get("/getAll", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "Invalid card id" });
  }
});

// @desct Updates the information of an existing card
router.put(
  "/update/:id",
  [
    check("name", "Please insert a name for the card").exists(),
    check("desct", "Please insert a description(desct) for the card").exists(),
    check("type", "Please insert a type for this card").isIn(cardTypes),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { name, desct, type } = req.body;
      let idRequested = req.params.id;
      let card = await Card.findById(idRequested);

      // Check there's no other card with the same name that's not the one being updated
      let cardFound = await Card.findOne({ name });
      if (card && cardFound && cardFound.id != card.id) {
        return res.status(400).json({ msg: "Card name already exists" });
      }

      if (card) {
        card.name = name;
        card.desct = desct;
        card.type = type;
        await card.save();
        res.json(card);
      } else {
        return res.status(404).json({ msg: "Card not found" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ msg: "Invalid card id" });
    }
  }
);

// @desct Deletes an existing card by its id
router.delete("/delete/:id", async (req, res) => {
  try {
    await Card.findOneAndRemove({ _id: req.params.id });
    // With a valid id, even an unexisting one, this will be sent
    res.json({ msg: "Card deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "Invalid card id" });
  }
});

module.exports = router;
