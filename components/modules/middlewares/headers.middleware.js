export default function headersMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "numberOfTenders");
  next();
}
