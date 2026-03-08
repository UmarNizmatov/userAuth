import jwt from 'jsonwebtoken'
const generateAccessToken =(user)=>{
    return jwt.sign({user},process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"})
}
const generateRefreshToken =(user)=>{
    return jwt.sign({id:user.id},process.env.REFRESH_SECRET_KEY,{expiresIn:"7d"})
}
export {generateAccessToken,generateRefreshToken}