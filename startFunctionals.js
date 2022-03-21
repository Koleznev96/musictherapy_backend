const Admin = require('./src/models/Admin');
const Version = require('./src/models/Version');

module.exports.startServerCheckAdmin = async () => {
    const count = await Admin.find().count();
    if (count >= 1) return;

    const date = new Date();

    let admin = new Admin({
        email: 'admin@admin.com',
        password: 'admin',
        name: 'admin',
        fullName: 'admin',
        telephone: '+79999999999',
        date_last_activity: date,
        registration_date: date,
    });

    await admin.save();
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