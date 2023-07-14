module.exports = (err, req, res, next) => {
  console.log("Middleware Error Hadnling")

  const errStatus = err.statusCode || 500
  const errMsg = err.message || "Prišlo je do napake."

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  })
}
