const router = require("express").Router();
const { User } = require("../db");
const { Contract } = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: Contract,
        });
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/:userId", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: Contract,
        });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next)=>{
    try{
        res.status(201).send(await User.create(req.body))
    }catch(err){
         next(err)
    }
})

router.put('/:userId', async (req, res, next)=>{
    try{
        const user = await User.findByPk(req.params.userId)
        res.send(await user.update(req.body))
    }catch (err){
        next(err)
    }
})

router.delete("/:campusId", async (req, res, next) =>{
    try{
        const user = await User.findByPk(req.params.userId)
        user.destroy()
        res.send(user)
    }catch (err){
        next(err)
    }
})

module.exports = router
