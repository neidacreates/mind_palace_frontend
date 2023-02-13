import axios from "axios";

const getYoutubeThumbnail = async (backgroundVideo) => {
  console.log("inside getyoutubethumbnail function");
  const youtubeResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        id: backgroundVideo,
        part: "snippet",
        key: process.env.REACT_APP_YOUTUBE_KEY,
      },
    }
  );
  return youtubeResponse.data.items[0].snippet.thumbnails.high.url;
};

export default getYoutubeThumbnail;
