const express = require("express");
const router = express.Router();

router.get("/admin", function(req,res) {
  // if(req.user) {
  //   // if(req.user.type === "a") { res.render("adminpage"); }
  //   // else { res.redirect("/"); }
  //   Admin.findOneById(req.user.id, (err, foundAdmin) => {
  //     if(err) {console.log(err); return res.redirect("/"); }
  //     if(!foundAdmin) {return res.redirect("/"); }
  //     if(foundAdmin) {return res.render("adminpage"); }
  //   });
  //
  // }
  // else { res.redirect("/"); }
  res.render("adminpage");
});

module.exports = router;
