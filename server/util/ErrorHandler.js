module.exports = (err, req, res, next) => {
  console.log("Middleware Error Handling")

  const errStatus = err.statusCode || 500
  let errMsg = "Prišlo je do napake"

  if (typeof err === "string") {
    errMsg = err
  } else if (typeof err === "object") {
    errMsg = err.message
  }

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  })
}
