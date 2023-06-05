const router = require("express").Router();
const { Bid, User, Item } = require("../../models");

//Get all bids
router.get("/", async (req, res) => {
    try {
        const dbData = await Bid.findAll();
        if (dbData.length === 0) {
            return res.status(404).json({ msg: "no Bids in database!" });
        }
        console.log("dbData:", dbData);
        return res.json(dbData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "could not get Bids", err: err });
    }
});
//Create a bid
router.post("/", async (req, res) => {
    try {
      const offererId = req.body.offerer_id;
      const user = await User.findByPk(offererId);
      const offeringId = req.body.offering_id;
      const item = await Item.findByPk(offeringId);
      const newBid = {
        offer: req.body.offer
      }
  
      const dbData = await Bid.create(newBid);
      dbData.setOfferer(user);
      dbData.setOffering(item);
  
      return res.json({
        bid: dbData
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Could not create Bid", err: err });
    }
  });


module.exports = router;