const express = require("express"),
      moment = require("moment");

const router = express.Router();

const keys = require("../config/keys");
const Client = require("../models/Client");
const Partner = require("../models/Partner");
const Message = require("../models/Message");
const IndividualMessage = require("../models/IndividualMessage");


// Do this at 견적 요청 later?
router.post("/start_message", (req, res) => {
    Partner.findOne({email: req.body.send_to}, function(err, foundPartner) {
        if (err || !foundPartner) {
            req.flash("error", "파트너를 찾을수 없습니다. 다시 시도해주세요.");
            return res.redirect("/user_profile");
        }
        
        var newMessage = new Message({
            client: req.user.id,
            clientName: req.user.name,
            clientPic: req.user.companyLogo,
            partner: foundPartner._id,
            partnerName: foundPartner.name,
            partnerPic: foundPartner.profilePic,
            detail: {
                content: req.body.content,
                author: "c",
                time: moment(Date.now()).format("HH:mm"),
                date: moment(Date.now()).format("YYYY-MM-DD")
            }
        });
        newMessage.save((err) => {
              if (err) {
                  console.log(err);
                  req.flash("error", "메세지를 보낼수 없습니다. 다시 시도해주세요.");
                  return res.redirect("/user_profile");
              }
              console.log("Message created between " + req.user.name + " and " + foundPartner.name);
              return res.redirect("/user_profile/messages");
        });
        
    });
});


router.get("/message_room/:messageID", (req, res) => {
    if (req.user) {
        Message.findById(req.params.messageID, (err, foundMessage) => {
            if (err || !foundMessage) {
                req.flash("error", "메세지를 찾을수 없습니다. 다시 시도해주세요.");
                return res.redirect("/user_profile");
            }
            if (req.user.type === "c") {
                Partner.findById(foundMessage.partner, function(err, foundPartner) {
                    return res.render("message_room", { thisMessage: foundMessage, partnerPic: foundPartner.profilePic});
                });
            } else {
                Client.findById(foundMessage.client, function(err, foundClient) {
                    return res.render("message_room", { thisMessage: foundMessage, clientPic: foundClient.companyLogo});
                });
            }
            // return res.render("message_room", { thisMessage: foundMessage });
        });
    } else {
        res.redirect("/");
    }
});


router.post("/send_message_client", (req, res) => {
    var newMessage = new IndividualMessage({
        content: req.body.content,
        author: "c",
        time: moment(Date.now()).format("HH:mm"),
        date: moment(Date.now()).format("YYYY-MM-DD")
    });
  
    Message.findOneAndUpdate({_id : req.body.message}, { $push: { detail : newMessage } }, function(err, message) {
        if (err) {
            console.log(err);
            req.flash("error", "메세지를 보낼수 없습니다. 다시 시도해주세요.");
            return res.redirect("/user_profile");
        };
        console.log("Message successfully sent.");
        return res.redirect("/message_room/" + req.body.message);
    });
});


router.post("/send_message_partner", (req, res) => {
    var newMessage = new IndividualMessage({
        content: req.body.content,
        author: "p",
        time: moment(Date.now()).format("HH:mm"),
        date: moment(Date.now()).format("YYYY-MM-DD")
    });
  
    Message.findOneAndUpdate({_id : req.body.message}, { $push: { detail : newMessage } }, function(err, message) {
        if (err) {
            console.log(err);
            req.flash("error", "메세지를 보낼수 없습니다. 다시 시도해주세요.");
            return res.redirect("/user_profile");
        };
        console.log("Message successfully sent.");
        return res.redirect("/message_room/" + req.body.message);
    });
});




module.exports = router;