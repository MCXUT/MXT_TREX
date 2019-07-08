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
    // 서비스명
    serviceName: {
        type: String
    },
    // 서비스별 예상 가격
    hourlyRate: {
        type: Number
    },
    // 서비스 소개
    aboutService: {
        type: String
    }
});


var PartnerProfileSchema = mongoose.Schema({
    // 프리랜서/에이전시(개인사업자/법인)
    // "freelancer" or "agency"
    type: {
        type: String,
        default: "",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // 본인 한줄 소개
    oneLineIntro: {
        type: String,
        default: ""
    },
    // 지역
    region: {
        type: String,
        default: ""
    },
    // 타지역
    otherRegion: {
        type: [String]
    },
    // 성별 (M, F, N/A) (에이전시일땐 N/A)
    // gender: {
    //     type: String
    // },
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
    unavailableDates: [String],
    // 제공 서비스
    availableServices: [ServiceSchema],
    // 파트너 인터뷰 여부
    isInterviewed: {
        type: Boolean,
        default: false
    },
    // 사업자 등록증 (에이전시일때만)
    businessRegistration: {
        type: [String]
    },
    // 미디어 (자격증, 면허증, 포트폴리오)
    media: {
        type: [String]
    },
    // 등록일자
    registeredDate: {
        type: Date
    },
    // 최근 수정일
    lastEditedDate: {
        type: Date
    },
    // 조회수
    views: {
        type: Number,
        default: 0
    }
}, {minimize: false});

var PartnerProfile = module.exports = mongoose.model('PartnerProfile', PartnerProfileSchema);
