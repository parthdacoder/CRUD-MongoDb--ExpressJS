const express = require("express");
const router = express.Router();
const club = require("../models/Club");

// router.get('/', (req,res,next) => {
//     res.send('Express Router is working')
// })

router.get("/", (req, res, next) => {
  club
    .find()
    .then((docs) => {
      res.render("home.ejs", { clubs: docs });
    })
    .catch((err) => {
      console.log("Something is wrong!");
    });
});

//Route to add elements
router.post("/add", async (req, res, next) => {
  const { sports, player, year } = req.body;

  console.log(sports, player, year);

  const uclClub = new club({
    sports,
    player,
    year,
  });

  try {
    await uclClub.save();
    console.log("Data is saved");
    res.redirect("/");
  } catch (err) {
    console.log("Something went wrong!!");
  }
});

//Route to show update elements
router.get("/edit/:id", (req, res, next) => {
  //console.log(req.params.id);
  club
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((docs) => {
      res.render("edit", { club: docs });
    })
    .catch((err) => {
      console.log("Can't fetch data!!");
      next(err);
    });
});

//Route to update elements
router.post("/edit/:id", (req, res, next) => {
  club
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((docs) => {
      console.log("Yayy!! Updated");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Can't update data!!");
      next(err);
    });
});

//Route to delete elements
router.get("/delete/:id", (req, res, next) => {
  club
    .findByIdAndDelete({ _id: req.params.id })
    .then((docs) => {
      console.log("Successfully deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Can't delete data!!");
      next(err);
    });
});

module.exports = router;
