const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// var CareerSchema = mongoose.Schema({
//     compName: String,
//     position: String,
//     startDate: String,
//     endDate: String,
//     description: String
// });
// 
// var EducationSchema = mongoose.Schema({
//     school: String,
//     degreeMajor: String,
//     graduationDate: Number,
//     description: String
// });

var ServiceSchema = mongoose.Schema({
    serviceName: String,
    hourlyRate: Number,
    // 서비스 소개
    aboutService: String
});


var PartnerProfileSchema = mongoose.Schema({
    // 프리랜서/에이전시(개인사업자/법인)
    // "freelancer" or "agency"
    type: {
        type: String,
        default: "",
        required: true
    },
    // 본인 한줄 소개
    oneLineIntro: {
        type: String,
        default: ""
    },
    // 성별 (M, F, N/A) (에이전시일땐 N/A)
    gender: {
        type: String
    },
    // 사업자 등록증 (에이전시일때만)
    businessRegistration: String,
    // // 직업
    // occupation: [String],
    // // 학력
    // education: [EducationSchema],
    // // 경력
    // career: [CareerSchema],
    // 자기소개
    aboutMe: {
        type: String,
        default: ""
    },
    // 예약 불가능일
    unavailableDates: [Date],
    // 제공 서비스
    availableServices: [ServiceSchema],
    // 파트너 인터뷰 여부
    isInterviewed: {
        type: Boolean,
        default: false
    },
    // 미디어 (자격증, 면허증, 포트폴리오)
    media: String,
    // 등록일자
    registeredDate: {
        type: Date,
        default: Date.now()
    },
    // 최근 수정일
    lastEditedDate: {
        type: Date,
        default: Date.now()
    },
    // 조회수
    views: {
        type: Number,
        default: 0
    }
}, {minimize: false});

var PartnerProfile = module.exports = mongoose.model('PartnerProfile', PartnerProfileSchema);
