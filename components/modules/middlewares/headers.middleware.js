export default function headersMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  next();
}
