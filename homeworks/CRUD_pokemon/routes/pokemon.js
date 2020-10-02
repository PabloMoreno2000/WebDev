const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const cardTypes = ["pokemon", "item", "price", "element"];
const cards = {};
// Assign each card type as an empty arrayto the object of cards
cardTypes.map((cardType) => {
  cards[cardType] = [];
});
let idCounter = 0;

function isType(type) {
  return cardTypes.includes(type);
}

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
    cards[type].push({ name, desct, type });
  }
);

module.exports = router;