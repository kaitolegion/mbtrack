// MIDDLEWARE FOR SUPER ADMIN

const isAuthenticatedAdmin = (req, res, next) => {
    if (req.cookies.uid) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

const checkAuthAdmin = (req, res, next) => {
    if (req.cookies.uid) {
        res.redirect('/admin/dashboard');
    } else {
        next();
    }
}

module.exports = {
    isAuthenticatedAdmin,
    checkAuthAdmin
};