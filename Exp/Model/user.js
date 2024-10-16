const mongoose = require("mongoose");

const ModelUser=mongoose.model('user',{
    Name:{
        require:true,
        type:String
    },
    phone:{
        require:true,
        type:String
    },
    age:{
        type:Number,
        // require:false,
        min:18
    }
})

module.exports=ModelUser