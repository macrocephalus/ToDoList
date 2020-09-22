const express = require("express");

const router = express.Router();

router.get('/',function(req, res, next){
    //res.send('INDEX');
    res.redirect(301,'/api/tasks');
});

module.exports = router;