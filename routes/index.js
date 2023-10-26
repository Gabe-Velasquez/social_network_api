const router = require('express').Router();
const apiRoutes=('./api');

router.use('/api', apiRoutes);

router.use((req,res)=>res.send('Wrong route! Oopsie...'));

module.exports=router;