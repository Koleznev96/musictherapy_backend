var fs = require('fs');


module.exports.upload_image = async function(req, res) {
    const image_url = req.file ? req.file.path : '';
    if (image_url) {
        return res.status(201).json(image_url);
    }
    return res.status(404).json('Error');
}

module.exports.upload_video = async function(req, res) {
    const image_url = req.file ? req.file.path : '';
    if (image_url) {
        return res.status(201).json(image_url);
    }
    return res.status(404).json('Error');
}

module.exports.delete_file = async function(req, res) {
    try {
        try {
            await fs.unlink(`./${req.body.url}`, (err) => {
                if (err) console.log("no delete!!!!");
            }).catch((e) => console.log(e));
        } catch(e) {

        }
        res.status(201).json("OK");
    } catch (e) {}
}
