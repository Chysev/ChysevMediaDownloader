import Cors from "cors";
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
import initMiddleware from "@/lib/initMiddleWare";
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
export const config = {
  api: {
    responseLimit: false,
  },
};

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
      const info = await ytdl.getBasicInfo(url);
      res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          info.videoDetails.title
        )}.mov"`,
      });

      // get stream
      const stream = ytdl(url, {
        filter: "audioandvideo",
        quality: "highest",
        format: "matroska",
      });

      // output stream as avi file
      return new Response(
        ffmpeg(stream)
          .format("matroska")
          .videoCodec("copy")
          .audioCodec("aac")
          .outputOptions("-movflags frag_keyframe+empty_moov")
          .on("error", (err) => {
            console.error("Error while transcoding:", err);
          })
          .pipe(res, { end: true })
      );
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
