// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

server.get('/hello', (req, res) => {
    res.status(200).json({message: "Hello!"});
})


server.get('/api/users', async (req, res) => {
    try{
        const users = await Users.find();
        if(users){
            res.status(200).json(users)
        }
    }
    catch(err){
        res.status(500).json({ message: 'The user information could not be retrieved' });
    }
})

server.get('/api/users/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const user = await Users.findById(id);
        if(!user){
            res.status(404).json({message: 'The user with the specified ID does not exist'});
        }else{
            res.status(200).json(user);
        }
    }
    catch(err){
        res.status(500).json({ message: 'The user information could not be retrieved' });
    }
})


server.post('/api/users', async (req, res) => {
    try{
        const {name, bio} = req.body;
        if(!name || !bio){
            res.status(400).json({message: 'Please provide name and bio for the user'});
        }else{
            const newUser = await Users.insert(req.body);
            res.status(201).json(newUser)
        }

    }
    catch(err){
        res.status(500).json({message: 'There was an error while saving the user to the database'});
    }
})


server.put('/api/users/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const {name, bio} = req.body;

        if(!name || !bio){
            res.status(400).json({message: 'Please provide name and bio for the user'});
        }
        else{
            const updatedUser = await Users.update(id, {name, bio});
            if(!updatedUser){
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            }
            else{
                res.status(200).json(updatedUser);
            }
        }

    }
    catch(err){
        res.status(500).json({ message: 'The user information could not be modified' });
    }
})


server.delete('/api/users/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const toDelete = await Users.remove(id);
        if(!toDelete){
            res.status(404).json({message: 'The user with the specified ID does not exist'});
        }else{
            res.status(200).json(toDelete);
        }
    }
    catch(err){
        res.status(500).json({ message: 'The user could not be removed' });
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
