const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.get('/practice', validateSession, function(req, res){
    res.send('Practice Route')
});

router.post('/log', validateSession, (req, res) => {
    const workoutEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id
    }
    Log.create(workoutEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.statusMessage(500).json ({ error: err}))
})

router.get('/', (req, res)=> {
    Log.findAll()
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error:err}))


});

    router.get('/log', validateSession, (req, res) => {
        let userid = req.user.id
        Log.findAll({
            where: { owner: userid}
        })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error:err}));
        
});

router.get('/:id', validateSession, (req, res) => {
    let id = req.params.id;

    Log.findAll({
        where: { id: id}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error:err}));
});


router.put('/:id', validateSession, (req, res) => {
    Log.update(req.body, {
        where: {id: req.params.id} 
    })
    
    .then(result => res.status(200).json(result))
    .catch(err=> res.status(500).json({ error: err }))

})

router.delete('/:id', validateSession, async (req, res) => {
    try {
        const Log = await Log.destroy({
            where: { id: req.params.id}
        });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: err});
    }
// router.delete('/:id', validateSession, (req, res) => {
//     const query = {where: {id: req.params.id, owner: req.user.id }};

//     Log.destroy(query)
//     .then(() => res.status(200).json({ message: 'workout log entry removed'}))
//     .catch((err) => res.status(500).json({ error: err}));
// })

})


module.exports = router;