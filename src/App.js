import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import YoutubeUrl from "./components/YoutubeUrl";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Winner from "./components/Winner";

function App() {
  let nextPageToken;
  const [link, setLink] = useState("");
  const [sameFilter, setSameFilter] = useState(false);
  const [wordFilter, setWordFilter] = useState({
    status: false,
    words: "",
  });
  const [videoId, setVideoId] = useState("");
  const [comments, setComments] = useState([]);
  const [pick, setPick] = useState();

  const [video, setVideo] = useState({
    key: "AIzaSyCcsuxBuEjmsC0fdQ2KqxkXfi6z0dfLGiU",
    url: "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&video_id=",
    status: false,
    resultPage: 0,
  });

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - 1 - min + 1)) + min;
  };
  //console.log(video)
  const checkLink = (link) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const result = link.match(regex);

    if (result) {
      toast.success("Başarılı!", { theme: "colored" });
      setVideoId(result[1]);
      setVideo({ ...video, status: true });
      setComments([]);
      setPick(null);
      return true;
    } else {
      toast.error(
        "Böyle bir link yok veya url yi doğru bir şekide girmediniz",
        { theme: "dark" }
      );
      setVideo({ ...video, status: false });
      setComments([]);
      return false;
    }
  };
  const fetching = async (uri, id, key) => {
    const { data } = await axios(uri + id + `&key=${key}`);
    return data;
  };
  const pickWin = () => {
    (async () => {
      if (video.status) {
        toast.error("Yorumlar başarılı bir şekilde getirildi.", {
          theme: "colored",
        });
        const data = await fetching(video.url, videoId, video.key);
        setVideo({ ...video, resultPage: data.pageInfo.totalResult });
        data.items.forEach((element) => {
          const { snippet } = element.snippet.topLevelComment;
          setComments((arr) => [
            ...arr,
            {
              authorDisplayName: snippet.authorDisplayName,
              authorChannelUrl: snippet.authorChannelUrl,
              authorProfileImageUrl: snippet.authorProfileImageUrl,
              textDisplay: snippet.textDisplay,
              textOriginal: snippet.textOriginal,
              updatedAt: snippet.updatedAt,
            },
          ]);
        });

        nextPageToken = data.nextPageToken;

        while (nextPageToken) {
          const { data } = await axios(
            `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&pageToken=${nextPageToken}&video_id=${videoId}&key=${video.key}`
          );
          setVideo({ ...video, resultPage: data.pageInfo.totalResults });

          data.items.forEach((element) => {
            const { snippet } = element.snippet.topLevelComment;
            setComments((arr) => [
              ...arr,
              {
                authorDisplayName: snippet.authorDisplayName,
                authorChannelUrl: snippet.authorChannelUrl,
                authorProfileImageUrl: snippet.authorProfileImageUrl,
                textDisplay: snippet.textDisplay,
                textOriginal: snippet.textOriginal,
                updatedAt: snippet.updatedAt,
              },
            ]);
          });
          nextPageToken = data.nextPageToken;

          if (!nextPageToken) {
            setVideoId("");
            break;
          }
        }
      } else {
        toast.error("Hata, Lütfen videoyu seçme butonuna tıklayın", {
          theme: "dark",
        });
      }
    })();
  };
  // console.log(comments);
  return (
    <div className="App container mt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="logo">
        <img src="../assets/yt-comment-picker-logo.png" alt="logo" />
      </div>
      <YoutubeUrl
        link={link}
        setLink={setLink}
        checkLink={checkLink}
        setSameFilter={setSameFilter}
        setWordFilter={setWordFilter}
        wordFilter={wordFilter}
      />

      <Winner
        comments={comments}
        video={video}
        sameFilter={sameFilter}
        wordFilter={wordFilter}
        videoId={videoId}
        pickWin={pickWin}
        pick={pick}
        setPick={setPick}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
