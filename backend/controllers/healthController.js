exports.getHealth = (_, res) => {
  res.status(200).json({ status: res.statusCode, message: "API Working" });
}