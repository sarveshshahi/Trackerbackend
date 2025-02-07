const asyncHandler =(requestHandler)=>{
    return (res,req,next)=>{
        Promise.resolve(requestHandler(res,req,next)).catch((err)=>next(err))
    }
}


//i am using higher oder function
// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}
// const asyncHandler = (func) => async () => {}


// const asyncHandler=(fn)=>async(res,req,next)=>{
//     try {
//         await fn(res,req,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:err.message
//         })
        
//     }
// }
