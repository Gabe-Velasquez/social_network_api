const router = require('express').Router();
const thoughtRoute=require('./thoughtRoute');
const userRoute=require('./userRoutes');

router.use('/user',userRoute);
router.use('/thoughts',thoughtRoute)

module.exports=router;