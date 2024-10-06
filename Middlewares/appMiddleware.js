const appMiddleware =(req,res,next)=>{
    console.log("inside middle ware");
    next();
    
}
module.exports=appMiddleware;