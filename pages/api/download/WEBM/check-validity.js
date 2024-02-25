import Cors from "cors";
const ytdl = require("ytdl-core");
import initMiddleware from "@/lib/initMiddleWare";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  try {
    if (req.method === "GET") {
      const url = req.query.url;
      if (!ytdl.validateURL(url)) {
        return res
          .status(400)
          .send("Invalid url. Please make sure you paste a valid Youtube URL.");
      }
      return new Response(res.status(200).end("OK"));
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
