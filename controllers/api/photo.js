const router = require("express").Router();
const {Photo, Item} = require("../../models");
// Get all photos
router.get("/", async (req, res) => {
    try {
      const dbData = await Photo.findAll();
      console.log("===\n\n\ntest\n\n\n===");
      if (dbData.length === 0) {
        return res.status(404).json({ msg: "no photos in database!" });
      }
      console.log("dbData:", dbData);
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get photos", err: err });
    }
  });
  // Get photo by id
router.get("/:id", async (req, res) => {
    try {
      const photoId = req.params.id;
      const dbData = await Photo.findByPk(photoId);
  
      if (!dbData) {
        return res.status(404).json({ msg: "photo not found!" });
      }
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get photo", err: err });
    }
  });
  //Create a Photo
  router.post("/", async (req, res) => {
    try {
      const newPhoto = {
        url: req.body.url
      };
  
      const dbData = await Photo.create(newPhoto);
  
      return res.json({
        photo: dbData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Could not create photo", err: err });
    }
  });
  //Update a Photo
  router.put("/:id", (req, res) => {
    Photo.update(
      {
       url: req.body.url
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((editPhoto) => {
        if (!editPhoto[0]) {
          return res
            .status(404)
            .json({ msg: "no Photo with this id in database!" });
        }
        res.json(editPhoto);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
  });
  // delete a photo by its `id` value
  router.delete("/:id", (req, res) => {
    Photo.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPhoto) => {
        res.json(deletedPhoto);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;