const express = require("express")
const router = express.Router();

const Client = require("../models/Client");
const Partner = require("../models/Partner");

// router.post("/user_account/deleteAccount", function(req,res) {
//     Client.comparePassword(req.body.password, req.user.password, (err, isMatch) => {
//         if(err) throw err;
//         if(!isMatch) {
//             req.flash("error", "Passwords do not match");
//             return res.redirect("/user_profile/account_info");
//         } else {
//             console.log(req.user._id);
//             Client.deleteClient(req.user._id);
//             return res.redirect("/");
//         }
//     });
// });

router.post("/user_account/deleteAccount", function(req, res) {

    if(req.user.type === "c") {
        Client.comparePassword(req.body.password, req.user.password, (err,isMatch) => {
            if(err) throw err;
            if(!isMatch) {
                req.flash("error", "Passwords do not match");
                return res.redirect("/user_profile/account_info");
            } else {
                console.log(req.user._id);
                Client.deleteClient(req.user._id);
                return res.redirect("/auth/logout");
            }
        });
    }
    else {
        Partner.comparePassword(req.body.password, req.user.password, (err,isMatch) => {
            if(err) throw err;
            if(!isMatch) {
                req.flash("error", "Passwords do not match");
                return res.redirect("/user_profile/account_info");
            } else {
                console.log(req.user._id);
                Partner.deletePartner(req.user._id);
                return res.redirect("/auth/logout");
            }
        });
    }
})

module.exports = router;
