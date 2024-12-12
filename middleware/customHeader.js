const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api;
        if(apiKey === 'leifer-01'){
            next();
        } else {
            res.status(403);
            res.send({error: 'API_KEY_NO_ES_CORRECTA'});
        }
    } catch (error) {
        
    }
}

module.exports = customHeader;
