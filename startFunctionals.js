const Admin = require('./src/models/Admin');

module.exports.startServer = async () => {
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