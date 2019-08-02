const express = require("express");
const router = express.Router();

const Client = require("../../models/Client");
const Partner = require("../../models/Partner");

router.get("/deleteClient/:id", function(req,res) {
    console.log("clientID: " + req.params.id);
    Client.deleteClient(req.params.id);
    res.redirect("/trex-admin?index=9");
});


// Section for Partners
router.get("/deletePartner/:id", function(req,res) {
    console.log("partnerID: " + req.params.id);
    Partner.deletePartner(req.params.id);
    res.redirect("/trex-admin?index=9");
});

router.get("/permanentlyDelete/:type/:id", function(req,res) {
    if(req.params.type === "client") {
        Client.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) console.log(err);
            else {
                return res.redirect("/trex-admin?index=9");
            }
        });
    } else {
        Partner.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) console.log(err);
            else {
                return res.redirect("/trex-admin?index=9");
            }
        });
    }
});

// Section for DeletedUsers Testing
router.get("/recoverUser/:type/:id", function(req, res) {
    console.log(req.params.type);
    if(req.params.type === "partner") {
        Partner.undeletePartner(req.params.id);
        return res.redirect("/trex-admin?index=3");
    } else {
        Client.undeleteClient(req.params.id);
        return res.redirect("/trex-admin?index=2");
    }
});

module.exports = router;
