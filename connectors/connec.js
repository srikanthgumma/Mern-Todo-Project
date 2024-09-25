const mongoose = require('mongoose');

const connec = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://srikanthgummadi516:EhPt1K5AB94xtghE@cluster1.h9ojo.mongodb.net/").then(() => {
            console.log("connected")
        }
        )
    } catch (error) {

        console.log(error);
        // res.status(200).json({ message: "not connected" })
        return;
    }
};
connec()