const express = require("express")
const router = express.Router();

const Client = require("../models/Client");
const Partner = require("../models/Partner");
const DeletedAccount = require("../models/DeletedAccount");

router.post("/user_account/deleteAccount", function(req, res) {
    if(req.user.type === "c") { //req.body.password
        Client.comparePassword(req.body.password, req.user.password, (err,isMatch) => {
            if(err) throw err;
            if(!isMatch) {
                req.flash("error", "Passwords do not match");
                return res.redirect("/user_profile/account_info");
            } else {
                Client.findByIdAndRemove( req.params.id , function(err, foundUser) {
                    if(err) throw err;
                    console.log(foundUser);
                    DeletedAccount.createDeletedAccount(foundUser, (err, deletedUser) => {
                        if(err) throw err;
                        res.redirect("/");
                    });
                });
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
                Partner.findByIdAndRemove(req.params.id , function(err, foundUser) {
                    if(err) throw err;
                    console.log(foundUser);
                    DeletedAccount.createDeletedAccount(foundUser, (err, deletedUser) => {
                        if(err) throw err;
                        res.redirect("/");
                    });
                });
            }
        });
    }
})
