import jwt from 'jsonwebtoken';
var JWT_Token = 'SpecialToken123';

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }  
    try {
     const datas = jwt.verify(token,JWT_Token);
     req.user = datas.user;
     next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    } 
    
}
export default fetchuser;