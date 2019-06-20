const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var CareerSchema = mongoose.Schema({
  compName: String,
  position: String,
  startDate: String,
  endDate: String,
  description: String
});

var ServiceSchema = mongoose.Schema({
  service: String,
  hourlyRate: Number
});


var PartnerProfileSchema = mongoose.Schema({
    // 본인 한줄 소개
    oneLineIntro: String,
    // 성별
    gender: String,
    // 직업
    occupation: [String],
    // 학력
    education: {
      school: String,
      degreeMajor: String,
      graduationDate: Number,
      description: String
    },
    // 경력
    career: [CareerSchema],
    // 자기소개
    aboutMe: String,
    // 예약 불가능일
    unavailable: [Date],
    // 제공 서비스
    availableServices: [ServiceSchema],
    // 서비스 소개
    aboutService: String,
    // 미디어 (자격증, 면허증, 포트폴리오)
    media: String
}, {minimize: false});

var PartnerProfile = module.exports = mongoose.model('PartnerProfile', PartnerProfileSchema);
