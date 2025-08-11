const mongoose = require("mongoose");


function DBconnect() {
    mongoose.connect(process.env.DATABASE_URL, { dbName: "Ai-checker" })
        .then(() => {
            console.log("✅ Database Connected")

        })
        .catch((err) => console.error("❌ Database Connection Failed:", err));
}

module.exports = DBconnect;