import axios from "axios";

export const handleDownload = (url, selectedOption, setErrorText, setUrl) => {
  if (!url) {
    setErrorText("Please enter a URL.");
    return;
  }

  let downloadEndpoint = "";
  switch (selectedOption) {
    case "mp3":
      downloadEndpoint = "MP3";
      break;
    case "flac":
      downloadEndpoint = "FLAC";
      break;
    case "wav":
      downloadEndpoint = "WAV";
      break;
    case "mp4":
      downloadEndpoint = "MP4";
      break;
    case "mov":
      downloadEndpoint = "MOV";
      break;
    case "flv":
      downloadEndpoint = "FLV";
      break;
    case "avi":
      downloadEndpoint = "AVI";
      break;
    case "webm":
      downloadEndpoint = "WEBM";
      break;
    case "mkv":
      downloadEndpoint = "MKV";
      break;
    default:
      setErrorText("Please select a valid file format.");
      return;
  }

  axios(`/api/download/${downloadEndpoint}/check-validity?url=${url}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.data === "OK") {
        window.open(`/api/download/${downloadEndpoint}?url=${url}`);
      }
    })
    .catch((err) => {
      setErrorText(err.response?.data || err.message);
    });

  setUrl("");
};
