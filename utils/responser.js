import Myerror from "./myError.js";

const myResponse = (res, status, message, data, success) => {
  if (!Number.isInteger(status))
    throw new Myerror(400, "status must be integer");
  return res.status(status || 200).json({
    success: success || true,
    message: message || "success",
    data: data || null,
  });
};
export default myResponse;
