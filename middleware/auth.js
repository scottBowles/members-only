function isSelf(req, res) {
  const { currentUser } = res.locals;
  const { id } = req.params;
  return currentUser?.id === id;
}

function verifyRole(requiredRole, req, res) {
  const { currentUser } = res.locals;
  return currentUser?.roles.includes(requiredRole);
}

function isValid(requiredRoles, req, res) {
  if (typeof requiredRoles === 'string') {
    return requiredRoles === 'self'
      ? isSelf(req, res)
      : verifyRole(requiredRoles, req, res);
  }
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.every((role) =>
      role === 'self' ? isSelf(req, res) : verifyRole(role, req, res)
    );
  }
  throw new TypeError('Invalid argument type given to auth middleware');
}

module.exports = (requiredRoles) => (req, res, next) => {
  if (isValid(requiredRoles, req, res)) {
    return next();
  }
  throw new Error('Just... no.');
};
