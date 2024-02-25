import { useState } from "react";
import { Accordion } from "@mantine/core";
import { handleDownload } from "@/lib/download";

export default function Home() {
  const [errorText, setErrorText] = useState("");
  const [url, setUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("Choose File Format");

  const handleDownloadClick = (e) => {
    e.preventDefault();
    handleDownload(url, selectedOption, setErrorText, setUrl);
  };

  const info = [
    {
      value: "What is Chysev Media Downloader",
      description: `
                  Chysev Media Downloader is a versatile tool designed to facilitate
          the seamless conversion and downloading of audio and video files from
          Youtube. With this downloader, users can effortlessly extract MP3
          audio or MP4 video from various online sources by simply providing the
          URL of the desired content.
        `,
    },
    {
      value: "Supported Track Format",
      description: "MP3, FLAC, WAV, MP4, MOV, FLV, AVI, WEBM, MKV",
    },
    {
      value: "Goal",
      description: "Supports all platforms, not limited to YouTube.",
    },
  ];

  const Info = info.map((item) => (
    <Accordion.Item
      key={item.value}
      value={item.value}
      className="bg-gray-800"
      bg="rgb(31 41 55 / var(--tw-bg-opacity))"
    >
      <Accordion.Control>
        <p className="text-white">{item.value}</p>
      </Accordion.Control>

      <Accordion.Panel bg="rgb(31 41 55 / var(--tw-bg-opacity))">
        {item.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-900 px-[20px]  text-white">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg p-8">
        <h1 className="text-[24px] font-bold text-center mb-8">
          Chysev Media Downloader
        </h1>
        <div className="mt-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Youtube URL"
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-white"
          />
        </div>

        <div className="mt-4">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="px-4 flex gap-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-white"
          >
            <option>Choose File Format</option>
            <optgroup label="Audio">
              <option value="mp3">MP3</option>
              <option value="flac">FLAC</option>
              <option value="wav">WAV</option>
            </optgroup>
            <optgroup label="Video">
              <option value="mp4">MP4</option>
              <option value="mov">MOV</option>
              <option value="flv">FLV</option>
              <option value="avi">AVI</option>
              <option value="webm">WebM</option>
              <option value="mkv">MKV</option>
            </optgroup>
          </select>
        </div>

        <button
          onClick={handleDownloadClick}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md text-[16px] font-semibold hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 w-full"
        >
          Convert & Download
        </button>
        {errorText && (
          <p className="mt-4 text-red-600 font-semibold">{errorText}</p>
        )}
      </div>

      <Accordion
        variant="separated"
        className="max-w-lg w-full"
        transitionDuration={400}
      >
        {Info}
      </Accordion>
    </div>
  );
}
