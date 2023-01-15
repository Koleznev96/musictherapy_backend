const Translation = require('../src/models/Translation');


module.exports.uploadTranslation = async function(req, res) {
    let ru_ = await Translation.findOne({value: "ru"});
    let com_ = await Translation.findOne({value: "com"});

    if (!ru_) {
        ru_ = new Translation({
            label: "Русский",
            value: "ru",
            file: "",
        });

        await ru_.save();
    }

    if (!com_) {
        com_ = new Translation({
            label: "Английский",
            value: "com",
            file: "",
        });

        await com_.save();
    }
}

module.exports.uploadTranslationAdmin = async function(req, res) {
    let ru_ = await Translation.findOne({value: "ru", status: 'admin'});
    let com_ = await Translation.findOne({value: "com", status: 'admin'});

    if (!ru_) {
        ru_ = new Translation({
            label: "Русский",
            value: "ru",
            file: "",
        });

        await ru_.save();
    }

    if (!com_) {
        com_ = new Translation({
            label: "Английский",
            value: "com",
            file: "",
        });

        await com_.save();
    }
}
