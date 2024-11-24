import express, { Router, Request, Response, Application } from "express";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

// Define the stream route
router.get("/stream/:id", (req: Request, res: any) => {
  const videoId: string = req.params.id;
  const videoPath = path.join(
    __dirname,
    "../../public/videos",
    `${videoId}.mp4`
  );

  // Check if the video exists
  if (!fs.existsSync(videoPath)) {
    return res.status(404).send("Video not found");
  }

  // Get the Range header from the request
  const range = req.headers?.range;

  if (!range) {
    // If no Range header, send the entire video
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": fs.statSync(videoPath).size.toString(),
    });

    // Create a readable stream for the entire video
    const videoStream = fs.createReadStream(videoPath);

    // Pipe the stream to the response
    videoStream.pipe(res);
  } else {
    const videoSize = fs.statSync(videoPath).size; // Total size of the video
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, "")); // Start of the range
    const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1); // End of the range

    // Set headers for partial content
    const contentLength = end - start + 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    });

    // Create a readable stream for the specific range
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Pipe the stream to the response
    videoStream.pipe(res);
  }
});

export default router;
