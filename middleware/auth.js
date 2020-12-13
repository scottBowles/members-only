module.exports = (requiredRole) => (req, res, next) => {
  // Verify requiredRole is assigned to currentUser
  const { currentUser } = res.locals;
  if (currentUser?.roles.includes(requiredRole)) {
    return next();
  }
  throw new Error('Just... no.');
};
