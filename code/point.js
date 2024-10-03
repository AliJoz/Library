const file=require("fs");
file.rename("./dbb.json","./db.json",(err)=>{
    if(err){
        throw err
    }
    else{
        console.log("rename file susseful")
    }
})

// methode unlink   
// for delete file 
// exiestsynck  is  fill