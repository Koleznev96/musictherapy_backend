module.exports = (res, error) => {
    console.log('error-', error)
    res.status(error.status ? error.status : 500).json({
        success: false,
        message: error.message ? error.message : error
    });
}
