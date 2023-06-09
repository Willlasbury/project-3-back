const router = require("express").Router();
const { Offer, User, Item } = require("../../models");

const getTokenInfo = require("../utils/getTokenInfo");

// Get all offers
router.get("/", async (req, res) => {
  try {
    const dbData = await Offer.findAll();
    if (dbData.length === 0) {
      return res.status(404).json({ msg: "no Offers in database!" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get Offers", err: err });
  }
});
// Create an Offer
router.post("/", async (req, res) => {
  try {
    const offererId = req.body.offerer_id;
    const user = await User.findByPk(offererId);
    const offeringId = req.body.offering_id;
    const item = await Item.findByPk(offeringId);
    const newOffer = {
      offer: req.body.offer,
    };

    const dbData = await Offer.create(newOffer);
    dbData.setOfferer(user);
    dbData.setOffering(item);

    return res.json({
      offer: dbData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Could not create Offer", err: err });
  }
});
// get all offers for a user
// get user from token and search for where offer.items...seller_id is userId from token
router.get("/recieved/:token", async (req, res) => {
  try {
    const data = getTokenInfo(req.params.token);
    const dbData = await Offer.findAll(
      { where: {accepted: false },
        include: [
          { model: Item, where: { seller_id: data.userId} },
        ],
      },
    );
    if (dbData.length === 0) {
      return res.status(200).json({ msg: "no offers in database!" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get offers", err: err });
  }
});

router.get("/sent/:token", async (req, res) => {
  try {
    const data = getTokenInfo(req.params.token);
    const dbData = await Offer.findAll({
      where: { offerer_id: data.userId },
      include: { model: Item },
    });
    if (dbData.length === 0) {
      return res
        .status(200)
        .json({ msg: "You do not currently have any offers out" });
    }
    return res.json(dbData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "could not get offers", err: err });
  }
});

// delete offer
router.delete("/:id", (req, res) => {
  Offer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedOffer) => {
      res.json(deletedOffer);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
