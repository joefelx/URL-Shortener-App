import UrlModel from '../../models/UrlModel.js';
import CustomDomain from '../../models/CustomDomainModel.js';

export const redirectFromCustomDomain = async (req, res, next) => {
    try {
        const hostname = req.hostname;

        const path = req.url;

        console.log(path);
        console.log(hostname);

        const shortUrl = req.params.short;

        const customDomain = await CustomDomain.findOne({ domain: hostname });

        if (customDomain) {
            const url = await UrlModel.findOne({
                'urlArray.shortUrl': shortUrl,
            }).select({ 'urlArray.$': 1 });
            res.status(302).redirect(url.urlArray[0].originalUrl);
        }

        res.status(404).json({ error: 'Url not found' });


    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}