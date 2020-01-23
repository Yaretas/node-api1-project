// implement your API here
const express = require("express");

const db = require('./data/db.js');

const server = express();

server.listen(4000, () => {
    console.log('*** listening on port 4000');
})

// global middleware Section
server.use(express.json());

// GET	/api/users	Returns an array of all the user objects contained in the database.
server.get('/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
        });
});

// GET	/api/users/:id	Returns the user object with the specified id.
server.get('/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(userId => {
        if (userId) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    
})

// POST	/api/users	Creates a user using the information sent inside the request body.
server.post('/users', (req,res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            resizeTo.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
        });
    }
})

// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete('/users/:id', (req,res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).end();
            } else {
                res.status(404).json({ message: `User id=${id} does not exist.` });
            }
        })
        .catch( err => {
            res.status(500).json({ message: 'User could not be removed.' });
        })
})

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/users/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User with specified id does not exist."});
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user information could not be modified." });
        })
})