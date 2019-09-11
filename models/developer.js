let mongoose = require('mongoose')

let developerSchema = mongoose.Schema({
    name:{
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    Level:{
        type:String,
        validate:{
            validator:function(value){
                return true
                if(value=="Beginner"||value=="Expert"){
                    return true
                }
                else{
                    console.log("failed")
                    return false

                }
                    
            },
            message:'Please enter Beginner or Expert only'

        },
        set:function(value){
            return value.toUpperCase()
        },
        required:true
    },
    /*Level:{
        type:String,
        required:true
    },*/
    Address:{
        State:String,
        Suburb:String,
        Street:String,
        Unit:String
    }
})

let developerModel=mongoose.model("Developer",developerSchema)
module.exports=developerModel;