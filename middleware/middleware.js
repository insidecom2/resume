const checkAuthenticated = (req, res, next) => {
     if (req.isAuthenticated()) {
         return next();
    }
    return res.redirect('/backoffice/login')
}

const checkUnAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/backoffice/notify')
   }
   return next();
}

const checkApiAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
   }
   res.status(401).json({ message: 'un authorization'})
}
module.exports = { checkAuthenticated , checkUnAuthenticated, checkApiAuthenticated}