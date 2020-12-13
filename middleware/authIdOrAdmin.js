module.exports = (req, res, next) => {
  const { currentUser } = res.locals;
  const { id } = req.params;
  if (currentUser?.id === id || currentUser?.roles.includes('admin'))
    return next();
  throw new Error("That ain't you");
};