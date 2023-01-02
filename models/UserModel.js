const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type:String
  }
});
// pre                                                                                                                                                                         
UserSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        let salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})            

UserSchema.methods.comparePassword = async function (
    passwordInput
  ) {

      return bcrypt.compare(passwordInput,this.password).catch((e)=>false)
  };

const Data = mongoose.model("User", UserSchema);

module.exports = Data;