// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv';

//

// export const authenticateToken=(req,res,next)=>{

//        const authheader= req.headers["authorization"];
//        const token= authheader && authheader.split(' ')[1];

//        if(token==null)
//        return res.json({msg:"token is missing"});

//        jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
//         if(error)
//         {
//             return res.json({msg:'invalid token'})
//         }

//        req.user=user;
//         next();
//        })
// }
