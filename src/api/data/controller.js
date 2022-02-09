const errorHandler = require('../../utils/errorHandler');
const LiveSound = require('../../models/LiveSound');
const Video = require('../../models/Video');
const User = require('../../models/User');
const {limitPageData} = require("../../utils/dataConst");


module.exports.get_list_live_sound = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await LiveSound.find({}, null, { skip: page, limit: limitPageData });
        const count_page = (await LiveSound.find({}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_meditation = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await Video.find({category: "meditation"}, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find({category: "meditation"}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_classic = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await Video.find({category: "classic"}, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find({category: "classic"}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_user = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const filter = req.params.full_name !== "null" ? {fullName: req.params.full_name} : {};
        const data = await User.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await User.find(filter).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});

        let candidate = await User.findOne({_id: req.user.id});
        candidate.date_last_activity = new Date();
        await candidate.save();
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_live_sound_ios = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await LiveSound.find({}, null, { skip: page, limit: limitPageData });
        const count_page = (await LiveSound.find({}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_meditation_ios = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await Video.find({category: "meditation"}, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find({category: "meditation"}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.get_list_classic_ios = async function(req, res) {
    try {
        const page = Number(req.params.page);
        const data = await Video.find({category: "classic"}, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find({category: "classic"}).count());
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}
