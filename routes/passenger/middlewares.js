// MIDDLEWARE FOR PASSENGER

const isAuthenticatedPassenger = (req, res, next) => {
    if (req.cookies.uid) {
        next();
    } else {
        res.redirect('/app/login');
    }
}

const checkAuthPassenger = (req, res, next) => {
    if (req.cookies.uid) {
        res.redirect('/app/dashboard');
    } else {
        next();
    }
  }

module.exports = {
    isAuthenticatedPassenger,
    checkAuthPassenger
};