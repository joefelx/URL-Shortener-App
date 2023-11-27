import { nanoid } from 'nanoid';
import CustomDomain from '../../models/CustomDomainModel.js';

export const setCustomDomain = async (req, res) => {
    try {
        const { domain } = req.body;
        const userId = req.user._id;
        const token = nanoid(20);

        const domainObject = await CustomDomain.findOne({ userId });

        if (domainObject) {
            res.json('Domain already exsisted');
        } else {
            const customDomain = new CustomDomain({
                userId,
                domain,
                verificationToken: token,
            });
            customDomain.save();

            res.json({
                domain: domain,
                token: token,
            });
        }
    } catch (error) {
        res.status(500).json('Something went wrong');
    }
};
