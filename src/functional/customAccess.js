const Accesses = require("../models/Accesses");

const CUSTOM_ACCESS = "custom";

module.exports.customAccess = async (data, type_content, custom_access_ids) => {
    if (data.access && data.access.indexOf(CUSTOM_ACCESS) !== -1) {
        await Accesses.deleteMany({
            id_content: data._id,
            type_content,
        });
        if (!custom_access_ids) {
            return;
        }
        for (let i = 0; i < custom_access_ids.length; i++) {
            let new_access = new Accesses({
                id_content: data._id,
                type_content,
                id_user: custom_access_ids[i],
            });
            await new_access.save();
        }
    }
};

module.exports.customAccessGet = async (data, type_content) => {
    if (data.access.indexOf(CUSTOM_ACCESS) !== -1) {
        const access = await Accesses.distinct("id_user", {
            id_content: data._id.toString(),
            type_content,
        });
        return access;
    }
    return [];
};

module.exports.defineAccess = async (data, user, type_content) => {
    const access = user.access ? user.access : "Гость";
    for (let i = 0; i < data.length; i++) {
        let status = data[i].access.indexOf(access) !== -1;
        if (
            !status &&
            data[i].access.indexOf(CUSTOM_ACCESS) !== -1 &&
            user?._id
        ) {
            let access_find = await Accesses.findOne({
                id_content: data[i]._id.toString(),
                id_user: user?._id.toString(),
                type_content: type_content,
            });
            status = !!access_find;
        }
        data[i].settings = {
            access: status,
        };
    }

    return data;
};

module.exports.deleyteAccesses = async (id, type_content) => {
    await Accesses.deleteMany({
        id_content: id,
        type_content,
    });
};
