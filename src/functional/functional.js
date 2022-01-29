const User = require('../models/User');
const Site = require('../models/Photo');
const DataSite = require('../models/DataSite');


const day_to_day = (day) => {
    switch (day) {
        case 0:
            return 'Вс';
        case 1:
            return 'Пн';
        case 2:
            return 'Вт';
        case 3:
            return 'Ср';
        case 4:
            return 'Чт';
        case 5:
            return 'Пт';
        case 6:
            return 'Сб';
        default:
            return null;
    }
};

const rand = (max) => Math.floor(Math.random() * max);

const function_start = async () => {
    let date = new Date();
    let sites = await Site.find();
    let data = [];
    for (const site of sites) {
        data.push((await (await DataSite.find({site_id: site._id})).sort(function(a,b){
            return new Date(b.date) - new Date(a.date)
        })).reverse());
    }

    if (data && data.length !== 0) {
        if (data[0].length === 0) {
            for (let j = 0; j < sites.length; j++) {
                let gin_test = date;
                for (let i = 0; i < 7; i++) {
                    let new_date_data = new DataSite({
                        label: sites[j].label,
                        site_id: sites[j]._id,
                        data: rand(20),
                        day: day_to_day(gin_test.getDay()),
                        date: gin_test,
                    });
                    gin_test.setDate(gin_test.getDate() - 1);
                    await new_date_data.save();
                    sites[j].visits_today = rand(20);
                    sites[j].visits_all = rand(120);
                    await sites[j].save();
                }
            }
        } else {
            if (date.getDate() !== await new Date(data[0][0].date).getDate()) {
                for (let i = 0; i < data.length; i++) {
                    let ful = data[i].pop();
                    await ful.delete();
                }
                const day_new = day_to_day(date.getDay());
                for (const site of sites) {
                    let new_data_site = new DataSite({
                        label: site.label,
                        site_id: site._id,
                        data: site.visits_today,
                        day: day_new,
                        date: date,
                    });
                    await new_data_site.save();
                }

                for (let i = 0; i < sites.length; i++) {
                    sites[0].visits_today = 0;
                    await sites[0].save();
                }

            }
        }
    }
}

module.exports = { function_start };
