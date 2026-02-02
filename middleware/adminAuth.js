import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("auth", req.headers);
    // Check if the authorization header is provided
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing. Please log in.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Ensure the token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please log in again.",
      });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Debug log for the decoded token
    console.log("Decoded token:", decodedToken);

    // You can add additional validation logic here if needed
    // Example: Check specific claims or roles in the token payload

    next(); // Token is valid, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message);

    // Respond with an appropriate error message
    res.status(403).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default adminAuth;

// import jwt from "jsonwebtoken";
// const adminAuth = async (req, res, next) => {
//   try {
//     // const { token } = req.headers.authorization;
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(" ")[1];
//     console.log("token", token);
//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again ",
//       });
//     }
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("toke", token_decode);
//     // if (
//     //   (token_decode !== process.env.ADMIN_EMAIL + token_decode.password) !==
//     //   process.env.ADMIN_PASSWORD
//     // ) {
//     //   return res.json({
//     //     success: false,
//     //     message: "Not Authorized Login Again ",
//     //   });
//     // }

//     next(); // Token is valid, proceed to the next step
//   } catch (error) {
//     console.log("Error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default adminAuth;
