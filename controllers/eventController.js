const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.date ||
        !req.body.location ||
        !req.body.image
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            image: req.body.image,
        });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: "Event couldn't be created" });
    }
};

const getAllEvents = async (req, res) => {
        try {
            const event = await Event.find().sort({$natural:-1});
            res.status(200).json({ event });
        } catch (error) {
            res.status(500).json({ message: "Couldn't fetch events" });
        }
};

const getEvent = async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id });
        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({ message: "Couldn't find event" });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await Event.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete event" });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id,req.body, {new:true,});
        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(error.status).json({message: "Couldn't delete event" }); // 500
    }
};


module.exports = {  
    createEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    updateEvent,
};