module.exports.checkLanguage = function(req, res) {
    return req.headers['language'] ? {language: {$eq: req.headers['language']}}: {};
}