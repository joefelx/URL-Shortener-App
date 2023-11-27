import mongoose from "mongoose";

const customDomainSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    domain: {
        type: String,
    },
    verificationToken: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Boolean,
        default: false
    }
})

const CustomDomainModel = mongoose.model('CustomDomain', customDomainSchema)

export default CustomDomainModel