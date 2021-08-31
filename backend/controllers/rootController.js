exports.getRoot = (_, res) => {
  res.status(403).send({error:'You are not authorized to make this request'});
};