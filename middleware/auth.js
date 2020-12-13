function isSelf(req, res) {
  const { currentUser } = res.locals;
  const { id } = req.params;
  return currentUser?.id === id;
}

function isUser(req, res) {
  return res.locals.currentUser;
}

function verifyRole(requiredRole, req, res) {
  const { currentUser } = res.locals;
  return currentUser?.roles?.includes(requiredRole);
}

function isValid(role, req, res) {
  switch (role) {
    case 'self':
      return isSelf(req, res);
    case 'user':
      return isUser(req, res);
    default:
      return verifyRole(role, req, res);
  }
}

function areAllValid(requiredRoles, req, res) {
  if (typeof requiredRoles === 'string') {
    return isValid(requiredRoles, req, res);
  }
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.every((role) => isValid(role, req, res));
  }
  throw new TypeError('Invalid argument type given to auth middleware');
}

function areAnyValid(requiredRoles, req, res) {
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.some((role) => isValid(role, req, res));
  }
  throw new TypeError(
    "Invalid argument type given to auth middleware. 'or' option only takes an array."
  );
}

module.exports = (requiredRoles, conjunction = 'and') => (req, res, next) => {
  // admin always authorized
  if (verifyRole('admin', req, res)) {
    return next();
  }

  if (conjunction === 'and' && areAllValid(requiredRoles, req, res)) {
    return next();
  }
  if (conjunction === 'or' && areAnyValid(requiredRoles, req, res)) {
    return next();
  }
  // else input is invalid (either invalid conjunction arg or auth denied)
  throw new Error('Just... no.');
};
