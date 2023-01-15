const errorHandler = require("../../utils/errorHandler");
const User = require("../../models/User");
var fs = require("fs");
const TranslationsLeng = require("../../models/TranslationsLeng");
const _ = require("lodash");

module.exports.get_lengs = async function (req, res) {
    try {
        let translations = await TranslationsLeng.find();
        res.status(201).json(translations);
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};

module.exports.get_translations = async function (req, res) {
    try {
        const code = req.params.code;
        const status = req.params.status;
        let candidate = await User.findOne({
            token: req.headers["authorization"],
        });
        if (candidate) {
            candidate.language = code;
            await candidate.save();
        }
        const translation = await TranslationsLeng.findOne({ code });
        console.log("translation", translation, code, status);
        await fs.readFile(
            `./${
                status === "app"
                    ? translation?.translations_app
                    : translation?.translations_admin
            }`,
            "utf8",
            async function (err, data) {
                if (err) {
                    console.log(
                        "errr, not File:",
                        `./${translation?.translations_file}`
                    );
                    res.status(201).json({});
                    return;
                }
                res.status(201).json(JSON.parse(data));
            }
        );
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};

module.exports.translation_create = async function (req, res) {
    try {
        let translations = req.body.data?._id
            ? await TranslationsLeng.findOne({ _id: req.body.data._id })
            : null;

        if (translations) {
            Object.entries(req.body.data).forEach((item) => {
                translations[item[0]] = !_.isUndefined(item[1])
                    ? item[1]
                    : null;
            });
        } else {
            translations = new TranslationsLeng({
                root: 0,
                ...req.body.data,
            });
        }
        await translations.save();

        res.status(201).json(translations);
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};

module.exports.translation_list_edit = async function (req, res) {
    try {
        for (let i = 0; i < req.body.data.length; i++) {
            let translations = req.body.data[i]?._id
                ? await TranslationsLeng.findOne({ _id: req.body.data[i]._id })
                : null;

            if (translations) {
                Object.entries(req.body.data[i]).forEach((item) => {
                    translations[item[0]] = !_.isUndefined(item[1])
                        ? item[1]
                        : null;
                });

                await translations.save();
            }
        }
        res.status(201).json("OK");
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};

module.exports.translation_del = async function (req, res) {
    try {
        let delete_data = await TranslationsLeng.findOne({ _id: req.body._id });

        // await fs
        //     .unlink(`./${delete_data?.translations_app}`, (err) => {
        //         if (err) {
        //             console.error(err);
        //         }
        //     })
        //     .catch(() => console.log("ggg"));

        // await fs
        //     .unlink(`./${delete_data?.translations_admin}`, (err) => {
        //         if (err) {
        //             console.error(err);
        //         }
        //     })
        //     .catch(() => console.log("ggg"));

        await delete_data.delete();
        res.status(201).json("OK");
    } catch (e) {
        errorHandler(res, e);
        // throw e;
    }
};
