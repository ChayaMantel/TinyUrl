import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    originalUrl: String,
    clicks: [
        {
            insertedAt:Date,
            ipAddress: String,
            targetParamValue: String
        }
    ],
    targetParamName: String,
    targetValues: [
        {
            name: String,
            value: String
        }
    ]
});

export default mongoose.model("Link", LinkSchema);
