const User = require('./src/models/User');
const Version = require('./src/models/Version');
const MaxNumbers = require('./src/models/MaxNumbers');
const Video = require('./src/models/Video');
const Audio = require('./src/models/Audio');
const LiveSound = require('./src/models/LiveSound');

module.exports.startServerCheckAdmin = async () => {
    // const count = await Admin.find().count();
    // if (count >= 1) return;
    //
    // const date = new Date();
    //
    // let admin = new Admin({
    //     email: 'admin@admin.com',
    //     password: 'admin',
    //     name: 'admin',
    //     fullName: 'admin',
    //     telephone: '+79999999999',
    //     date_last_activity: date,
    //     registration_date: date,
    // });
    //
    // await admin.save();
}

module.exports.startServerCheckVersion = async () => {
    const count = await Version.find().count();
    if (count >= 1) return;

    let version = new Version({
        version: '1',
        label: [{language: "ru", value: ""}, {language: "com", value: ""}],
        root: 0,
    });

    await version.save();
}

const addCounters = async (data) => {
    let maxCounter = 0;
    for (let i = 0; i < data.length; i++) {
        data[i].number = i;
        maxCounter = i;
        await data[i].save();
    }
    return {data, maxCounter}
}

module.exports.startServerCheckTables = async () => {
    const count = await MaxNumbers.find().count();
    if (count >= 1) return;

    let answer;
    let videos = await Video.find();
    const audios = await Audio.find();
    const live_sounds = await LiveSound.find();

    answer = await addCounters(videos);
    const table_1 = new MaxNumbers({
        table_name: "video",
        number: answer.maxCounter,
    });
    await table_1.save();

    answer = await addCounters(audios);
    const table_2 = new MaxNumbers({
        table_name: "audio",
        number: answer.maxCounter,
    });
    await table_2.save();

    answer = await addCounters(live_sounds);
    const table_3 = new MaxNumbers({
        table_name: "live_sound",
        number: answer.maxCounter,
    });
    await table_3.save();
}

module.exports.startServerIsAdminTables = async () => {
    let data_list = await User.find();

    for (let i = 0; i < data_list.length; i++) {
        let new_data = await User.findOne({_id: data_list[i]._id});
        if (typeof new_data.is_admin !== 'boolean') {
            new_data.is_admin = false;
            new_data.type_admin = 'Клиент';
            await new_data.save();
        } else {
            if (new_data.is_admin && !new_data.type_admin) {
                new_data.type_admin = 'Администратор';
            }
            if (!new_data.is_admin && !new_data.type_admin) {
                new_data.type_admin = 'Клиент';
            }
            await new_data.save();
        }
    }

    const count = await User.find({is_admin: true}).count();
    if (count >= 1) return;

    let admin = new User({
        language: 'ru',
        email: 'admin@admin.com',
        password: 'admin',
        name: 'admin',
        fullName: 'admin',
        telephone: '+79999999999',
        date_last_activity: new Date(),
        registration_date: new Date(),
        is_admin: true,
        access: "Гость",
        codeCheck: '',
        isNoCheck: false,
    });
    await admin.save();
}
