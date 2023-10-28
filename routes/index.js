const router = require('express').Router();
const apiRoutes=('./api');

router.use('/api', apiRoutes);

router.use((req,res)=>res.send("Invalid Route"));

module.exports=router;