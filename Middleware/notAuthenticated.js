function notAuthenticated(req, res, next) {
    if (!req.session.userId) {
      return next();
    }
    return res.redirect('/dashboard'); 
  }
  
  module.exports = notAuthenticated;