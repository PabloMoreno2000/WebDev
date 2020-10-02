const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const cardTypes = ["pokemon", "item", "price", "element"];
const cards = {};
// Assign each card type as an empty arrayto the object of cards
//cardTypes.map((cardType) => {
//cards[cardType] = [];
//});
// This is an id counter
let id = 0;

// @route
// @desct
router.post(
  "/create",
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

    // Let's extract and then create the object to avoid saving undesired parameters
    const { name, desct, type } = req.body;
    // Remember this is the same as {"name": name, "desct": desct...}
    cards[id] = { id, name, desct, type };
    // Increase counter for next card
    id++;
  }
);

router.get("/get/:id", (req, res) => {
  let idRequested = req.params.id;
  let card = cards[idRequested];
  if (card) {
    res.json(card);
  } else {
    return res.status(404).json({ msg: "Card not found" });
  }
});

module.exports = router;
