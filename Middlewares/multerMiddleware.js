const multer= require('multer')

//create storage
const storage=multer.diskStorage({
    //it consists of 2 keys
    //first is destination
    //second file name
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const fileName=`image-${Date.now()}-${file.originalname}`
        callback(null,fileName)
    }
})

//implement file filter
const fileFilter=(req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype ==='image/jpg')
        {
            callback(null,true)

    }else{
        callback(null,false);
        return callback(new ErrorEvent("only png,jpeg,jpg files are allowed"))
    }
}

const multerConfig=multer({
    storage,
    fileFilter
})
module.exports=multerConfig;