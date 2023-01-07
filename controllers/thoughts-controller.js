const { Thoughts, User, Reaction } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then((dbThougtsData) => res.json(dbThoughtsData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No Thoughts found with this id!" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addThoughts({ params }, res) {
        console.log(body);
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.thoughtsId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No Thoughts found with this id!" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    deleteThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No Thoughts found with this id!" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    addReactions({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No Thoughts found with this id!" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },
    
    deleteReactions({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionsId: params.reactionsId } } },
            { new: true }
        )
            .then(dbThoughtsData => {
                console.log(dbThoughtsData)
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    }

};

module.exports = thoughtsController;