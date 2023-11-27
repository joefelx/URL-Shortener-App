import CustomDomain from '../../models/CustomDomainModel.js';
import checkDomainOwnership from "../../utils/verifyCustomDomain.js"

export const verifyCustomDomain = async (req, res, next) => {
    try {
        const hostname = req.hostname;

        const { verificationToken } = await CustomDomain.findOne({ userId: req.user._id });

        let verified = await checkDomainOwnership(hostname, verificationToken)

        // res.json({
        //     hostname: hostname,
        //     token: verificationToken,
        //     verified: verified
        // })


        if (verified) {
            next()
        }

    } catch (error) {
        res.status(500).json("Something went wrong")
    }
}