const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date },
 
  title : {type:String},
  description:{type : String}, 
  read:{type:Boolean},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  link:{ type: String },
  category:{ type: String },
  categoryid:{ type: String },
  link:{ type: String },
  icon : { type: String ,default:'heroicons_solid:star'}

});

module.exports = mongoose.model("Notifications", notificationsSchema);
