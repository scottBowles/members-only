function isSelf(req, res) {
  const { currentUser } = res.locals;
  const { id } = req.params;
  return currentUser?.id === id;
}

function verifyRole(requiredRole, req, res) {
  const { currentUser } = res.locals;
  return currentUser?.roles?.includes(requiredRole);
}

function isValid(role, req, res) {
  if (role === 'self') return isSelf(req, res);
  return verifyRole(role, req, res);
}

module.exports = (requiredRoles) => (req, res, next) => {
  // admin always authorized
  if (verifyRole('admin', req, res)) {
    return next();
  }

  let inputType;
  if (typeof requiredRoles === 'string') inputType = 'string';
  if (Array.isArray(requiredRoles)) inputType = 'array';

  // validate according to inputType. arrays require one valid element.
  if (
    (inputType === 'string' && isValid(requiredRoles, req, res)) ||
    (inputType === 'array' &&
      requiredRoles.some((role) => isValid(role, req, res)))
  )
    return next();

  // else input is invalid or auth denied
  throw new Error('Just... no.');
};
