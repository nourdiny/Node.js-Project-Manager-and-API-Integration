function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    // If authenticated, allow the request to proceed to the next middleware
    return next();
  }
  // If not authenticated, send an error response
  res.redirect('/');
}

module.exports = isAuthenticated;