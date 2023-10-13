export default (err: any, req: any, res: any, next: any) => {
  console.log()
  console.log("\x1b[41mMiddleware Error Handling\x1b[0m")

  const errStatus = err.statusCode || 500
  let errMsg = "Prišlo je do napake"

  if (typeof err === "string") {
    errMsg = err
    console.log(errMsg)
  } else if (typeof err === "object") {
    errMsg = err.message

    // Printing out message stack
    console.log(err.stack)
  }
  console.log()

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  })
}
