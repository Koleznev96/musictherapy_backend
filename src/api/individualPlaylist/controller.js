const errorHandler = require('../../utils/errorHandler');
const checkUser = require('../auth/authUser');
const Audio = require('../../models/Audio');
const LogData = require("../../models/LogData");
const LikeAudio = require("../../models/LikeAudio");
const {checkLanguage} = require("../data/detectionLanguage");

function shuffle(array) {
    // Перемешивание масива
    return array.sort(() => Math.random() - 0.5);
}

function exact_comparison(array1, array2) {
    // Точное сранвнение
    if (array1?.length !== array2?.length) {
        return false;
    }

    for  (let i = 0; i < array2.length; i++) {
        if (array1.indexOf(array2[i]) === -1) return false;
    }
    return true;
}

function exact_comparison_for_one(array1, array2) {
    // Точное сранвнение на один
    if (array1?.length !== 1) {
        return false;
    }
    return array2.indexOf(array1[0]) !== -1;
}

function weak_comparison(array1, array2) {
    // Слабое сравнение
    let status = false;
    for  (let i = 0; i < array2.length; i++) {
        if (array1.indexOf(array2[i]) !== -1) status = true;
    }
    return status
}

const algorithm_instrument = (data, instruments) => {
    if (!instruments || instruments?.length === 0) return data;

    let array_one = [];
    let array_two = [];
    let array_three = [];
    for (let i = 0; i < data.length; i++) {
        if (exact_comparison(data[i].instruments, instruments)) {
            array_one.push(data[i]);
            continue;
        }
        if (exact_comparison_for_one(data[i].instruments, instruments)) {
            array_two.push(data[i]);
            continue;
        }
        if (weak_comparison(data[i].instruments, instruments)) {
            array_three.push(data[i]);
            continue;
        }
    }
    return array_one.concat(array_two).concat(array_three);
}

function alternation_elements(data1, data2) {
    let s = Math.max(data1.length, data2.length)  *2;
    let d =  [data1, data2];
    let answer = [];

    for(let i = 0; i < s; i++) {
        let v = d[i % 2][Math.floor(i / 2)];
        if(v !== undefined) answer.push(v);
    }

    return answer;
}

const algorithm_filter = async (instruments, filter) => {
    let data = shuffle(await Audio.find(filter));
    return algorithm_instrument(data, instruments);
}

const algorithm_free = async (instruments, filter, id_user) => {
    let data = shuffle(await LikeAudio.find({id_user}));
    let audios = [];
    for (let i = 0; i < data.length; i++) {
        audios.push(await Audio.findOne({_id: data[i].id_root}));
    }
    return algorithm_instrument(audios, instruments);
}

const algorithm_four = async (instruments, filter) => {
    let data1 = await algorithm_filter(instruments, {...filter, category: 'Активация'});
    let data2 = await algorithm_filter(instruments, {...filter, category: 'Релакс'});

    let audios = alternation_elements(data1, data2);

    return algorithm_instrument(audios, instruments);
}

const algorithm_five = async (instruments, filter, id_user) => {
    let data = shuffle(await Audio.find(filter));

    let data1 = [];
    let data2 = [];

    for (let i = 0; i < data.length; i++) {
       if (await LikeAudio.findOne({id_root: data[i]._id, id_user})) {
           data1.push(data[i]);
       } else {
           data2.push(data[i]);
       }
    }

    let audios = alternation_elements(data1, data2);

    return algorithm_instrument(audios, instruments);
}

module.exports.init = async function(req, res) {
    try {
        const check = await checkUser.check(req, res);
        if (!check._id) {
            return res.status(401).json('Unauthorized');
        }
        const {goal, instruments} = req.body;
        let filter = checkLanguage(req, res);
        let audios = [];
        switch (goal) {
            case 1:
                filter.category = 'Релакс';
                audios = await algorithm_filter(instruments, filter);
                break;
            case 2:
                filter.category = 'Активация';
                audios = await algorithm_filter(instruments, filter);
                break;
            case 3:
                filter.category = 'Релакс';
                audios = await algorithm_free(instruments, filter, check._id);
                break;
            case 4:
                audios = await algorithm_four(instruments, filter);
                break;
            case 5:
                audios = await algorithm_five(instruments, filter, check._id);
                break;
            default:
                audios = await algorithm_filter(instruments, filter);
        }

        for (let i = 0; i < audios.length; i++) {
            let status = await LikeAudio.findOne({id_root: audios[i]._id.toString(), id_user: check?._id.toString()});
            audios[i].like = status ? 1 : 0;
        }

        res.status(201).json({data: audios});
    } catch(e) {
        // errorHandler(res, e);
        // console.log('err-', e)
        // throw e;
    }
}