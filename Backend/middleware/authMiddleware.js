import jsonwebtoken from "jsonwebtoken"
const checkAuth = (req, res, next) => {

  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send("Authorization header missing!")
    }

    const token = authHeader.split(" ")[1]

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next();

  }

  catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token expired! Please login again.")
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token."
    })
  }
}


export default checkAuth;