const express = require("express");
const{userById,allUsers,getUser} = require("../controllers/user");



const router = express.Router();


router.get("/users",allUsers);
router.get("/users/:userId",getUser);


// any route containing:userId, our app will first execute userByid()
router.param("userId",userById);



module.exports = router;