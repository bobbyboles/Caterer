const router = require("express").Router();
const { Contract } = require("../db");
const { User } = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const contracts = await Contract.findAll({
            include: User,
        });
        res.json(contracts);
    } catch (err) {
        next(err);
    }
});

router.get("/:contractId", async (req, res, next) => {
    try {
        const contract = await Contract.findByPk(req.params.contractId, {
            include: User,
        });
        res.json(contract);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next)=>{
    try{
        res.status(201).send(await Contract.create(req.body))
    }catch(err){
         next(err)
    }
})

router.put('/:contractId', async (req, res, next)=>{
    try{
        const contract = await Contract.findByPk(req.params.contractId)
        res.send(await contract.update(req.body))
    }catch (err){
        next(err)
    }
})

router.delete("/:campusId", async (req, res, next) =>{
    try{
        const contract = await Contract.findByPk(req.params.campusId)
        contract.destroy()
        res.send(contract)
    }catch (err){
        next(err)
    }
})

module.exports = router
