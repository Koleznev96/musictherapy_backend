const errorHandler = require('../../utils/errorHandler');
const LiveSound = require('../../models/LiveSound');
const Video = require('../../models/Video');
const User = require('../../models/User');
const Audio = require('../../models/Audio');
const {limitPageData} = require("../../utils/dataConst");
const checkUser = require('../auth/authUser');
const LikeAudio = require("../../models/LikeAudio");
const LikeVideo = require("../../models/LikeVideo");
const Version = require("../../models/Version");
const {checkLanguage} = require("./detectionLanguage");


module.exports.get_list_live_sound_ios = async function(req, res) {
    try {
        let access = "Без регистрации";
        const page = Number(req.params.page);
        let filter = {language: {$eq: 'ru'}};
        let data = await LiveSound.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await LiveSound.find({}).count());
        for (let i = 0; i < data.length; i++) {
            // if (data[i].access.indexOf(access) === -1) {
            //     data.splice(i, 1);
            //     continue;
            // }
            data[i].label = data[i].label_?.find(item => item.language === 'ru')?.value;
        }
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData, access});
    } catch(e) {
        errorHandler(res, e);
        console.log('err-', e)
        // throw e;
    }
}

module.exports.get_list_meditation_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = {language: {$eq: 'ru'}};
        filter.category = "meditation";
        let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find(filter).count());
        for (let i = 0; i < data.length; i++) {
            if (data[i].access.indexOf(access) === -1) {
                data.splice(i, 1);
                continue;
            }
            data[i].label = data[i].label_?.find(item => item.language === 'ru')?.value;
            data[i].poster = data[i].poster_?.find(item => item.language === 'ru')?.value;
            data[i].text = data[i].text_?.find(item => item.language === 'ru')?.value;
        }
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_classic_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = {language: {$eq: 'ru'}};
        filter.category = "classic";
        let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        const count_page = (await Video.find(filter).count());

        for (let i = 0; i < data.length; i++) {
            if (data[i].access.indexOf(access) === -1) {
                data.splice(i, 1);
                continue;
            }
            data[i].label = data[i].label_?.find(item => item.language === 'ru')?.value;
            data[i].poster = data[i].poster_?.find(item => item.language === 'ru')?.value;
            data[i].text = data[i].text_?.find(item => item.language === 'ru')?.value;
        }
        res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}


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
        // throw e;
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
        // throw e;
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
        // throw e;
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
        // throw e;
    }
}

module.exports.get_v2_list_live_sound_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        let data = await LiveSound.find(filter);
        // let data = await LiveSound.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await LiveSound.find({}).count());
        // for (let i = 0; i < data.length; i++) {
        //     data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access) !== -1);
        // }
        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_meditation_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "meditation";
        let data = await Video.find(filter);
        // let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Video.find(filter).count());
        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }
        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_audio_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check._id) {
            return res.status(401).json('Unauthorized');
        }
        const category = req.params.category;
        const page = Number(req.params.page);
        // let data = await Audio.find({category}, null, { skip: page, limit: limitPageData });
        // const count_page = (await Audio.find({category}).count());
        let filter = checkLanguage(req, res);
        filter.category = category;
        let data = await Audio.find(filter);

        for (let i = 0; i < data.length; i++) {
            let status = await LikeAudio.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
            data[i].like = status ? 1 : 0;
        }
        res.status(201).json({data, page, count_page: 20, end_page: true});

        // res.status(201).json({data, page, count_page, end_page: count_page <= page + limitPageData});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_v2_list_classic_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "classic";
        let data = await Video.find(filter);
        // let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Video.find(filter).count());

        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }

        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_list_tool_ios = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        let access = "Без регистрации";
        if (check?._id) {
            access = check.access ? check.access : "Гость";
        }
        const page = Number(req.params.page);
        let filter = checkLanguage(req, res);
        filter.category = "tool";
        let data = await Video.find(filter);
        // let data = await Video.find(filter, null, { skip: page, limit: limitPageData });
        // const count_page = (await Video.find(filter).count());
        for (let i = 0; i < data.length; i++) {
            if (!(!data[i].access || data[i].access.indexOf(access) !== -1)) {
                if (data[i].access.length === 1 && data[i].access.indexOf("VIP") !== -1) {
                    data.splice(i, 1);
                    continue;
                }
                if (data[i].access.indexOf("Премиум") !== -1 && data[i].access.indexOf("Без регистрации") === -1
                    && data[i].access.indexOf("Гость") === -1) {
                    data[i].dostup = 'premium';
                } else {
                    data[i].dostup = 'auth';
                }
            } else {
                data[i].dostup = 'view';
            }
            // data[i].dostup = !!(!data[i].access || data[i].access.indexOf(access));
            if (check?._id) {
                let status = await LikeVideo.findOne({id_root: data[i]._id.toString(), id_user: check?._id.toString()});
                data[i].like = status ? 1 : 0;
            }
        }
        res.status(201).json({data, page, count_page: 1, end_page: true, access});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.video_like = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }
        const like = await LikeVideo.findOne({id_root: req.body.id.toString(), id_user: check?._id.toString()});
        if (req.params.status === "add" && !like) {
            const new_like = new LikeVideo({
                id_root: req.body.id.toString(),
                id_user: check?._id.toString()
            });
            await new_like.save();
        }
        if (req.params.status === "put" && like) {
            await like.deleteOne();
        }
        res.status(201).json("OK");
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.audio_like = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check?._id) {
            return res.status(401).json('Unauthorized');
        }

        const like = await LikeAudio.findOne({id_root: req.body.id.toString(), id_user: check?._id.toString()});

        if (req.params.status === "add" && !like) {
            const new_like = new LikeAudio({
                id_root: req.body.id.toString(),
                id_user: check?._id.toString()
            });
            await new_like.save();
        }
        if (req.params.status === "put" && like) {
            await like.deleteOne();
        }
        res.status(201).json("OK");
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}

module.exports.get_version = async function(req, res) {
    try {
        const version = await Version.findOne({root: 0});
        res.status(201).json({version});
    } catch(e) {
        errorHandler(res, e);
        // throw e;
    }
}
