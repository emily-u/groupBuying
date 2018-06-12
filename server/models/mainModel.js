// simple model
var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
// define the schema
var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: false },
    isAdmin: { type: Boolean, required: true },
    activated: { type: Boolean, default: false },
    userInfo: { type: Schema.Types.ObjectId, ref: "UserInfo"},
    joined_plan: [{ type: Schema.Types.ObjectId, ref: "Plan" }],
    created_plan: [{ type: Schema.Types.ObjectId, ref: "Plan" }],
},
  { timestamps: true },
);
var User = mongoose.model("User", UserSchema);


var UserInfoSchema = new mongoose.Schema({
    password: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
  })
var UserInfo = mongoose.model("UserInfo", UserInfoSchema);


var PlanSchema = new mongoose.Schema({
    company: { type: String, required: true },
    costPerMonth: { type: Number, required: true },
    line: { type: Number, required: true },
    withContract: { type: Boolean, required: true },
    description: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true}, 
    joinedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    completed: { type: Boolean, default: false } 
},
{ timestamps: true },
);
var Plan = mongoose.model("Plan", PlanSchema);


// var GroupSchema = new mongoose.Schema({
//     user: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     plan: { type: Schema.Types.ObjectId, ref: "Plan" },
// },
// { timestamps: true },);
// var Group = mongoose.model("Group", GroupSchema);