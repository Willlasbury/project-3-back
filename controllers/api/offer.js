const router = require("express").Router();
const { Offer, User, Item } = require("../../models");

//Get all offers
router.get("/", async (req, res) => {
    try {
        const dbData = await Offer.findAll();
        if (dbData.length === 0) {
            return res.status(404).json({ msg: "no Offers in database!" });
        }
        console.log("dbData:", dbData);
        return res.json(dbData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "could not get Offers", err: err });
    }
});
//Create an Offer
router.post("/", async (req, res) => {
    try {
      const offererId = req.body.offerer_id;
      const user = await User.findByPk(offererId);
      const offeringId = req.body.offering_id;
      const item = await Item.findByPk(offeringId);
      const newOffer = {
        offer: req.body.offer
      }
  
      const dbData = await Offer.create(newOffer);
      dbData.setOfferer(user);
      dbData.setOffering(item);
  
      return res.json({
        offer: dbData
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Could not create Offer", err: err });
    }
  });


module.exports = router;