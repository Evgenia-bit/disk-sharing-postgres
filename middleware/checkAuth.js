module.exports = function (req, res, next) {
    if(!req.session.person_id) {
       return res.json({status: 'error', msg: 'Авторизируйтесь в системе!'});
    }
    next()
}