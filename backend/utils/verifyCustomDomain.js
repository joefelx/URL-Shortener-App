import dns from 'native-dns'
import CustomDomain from '../models/CustomDomainModel.js';

export default async function checkDomainOwnership(hostname, token) {
    const expectedRecords = [`url-shortener-verification=${token}`]

    const customDomain = await CustomDomain.findOne({ verificationToken: token })

    dns.resolveTxt(hostname, async (err, records) => {
        records = records.flat();
        const verified = expectedRecords.every(record => records.includes(record))
        customDomain.verified = verified;
        await customDomain.save();
    })

    return customDomain.verified;
}

