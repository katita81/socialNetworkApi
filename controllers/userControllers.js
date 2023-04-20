const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )

            .catch((err) => { 
                console.log(err)
                res.status(500).json(err) 
            });
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {console.log(err);return res.status(500).json(err);});
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },{$set:req.body},{new:true})
            
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )

            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )

            .catch((err) => res.status(500).json(err));
    },
    // // add friend
    // addFriend(req, res) {
    //     User.create(req.body)
    //         .then((dbUserData) => res.json(dbUserData))
    //         .catch((err) => { console.log(err); return res.status(500).json(err); });
    // },

     async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove friend from friend list
    async deleteFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    // //delete friend
    // deleteFriend(req, res) {
    //     User.findOneAndDelete({ _id: req.params.userId })
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'No friend with that ID' })
    //                 : res.json(user)
    //         )

    //         .catch((err) => res.status(500).json(err));
    // },

};