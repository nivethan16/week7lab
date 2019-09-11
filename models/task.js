let mongoose = require('mongoose')

let taskSchema = mongoose.Schema({
    taskName:String,
    assignto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Developer'
    },
    dueDate: Date,
    status:{
        type:String,
        validate:{
            validator:function(value){
                if(value==="InProgress" || value==="Completed"){
                    return true
                }
                else
                    return false
            },
            message:'Please enter InProgress or Completed'
        }
    },
    description:String
})

let taskModel=mongoose.model("Task",taskSchema)
module.exports=taskModel