import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import YoutubeUrl from "./components/YoutubeUrl";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Winner from "./components/Winner";

function App() {
  const arr = [];
  let nextPageToken;
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState({
    url: "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&video_id=",
    link: "",
    status: false,
    resultPage: 0,
    videoId: "",
    reVideoId: "",
    pick: "",
    sameFilter: false,
    wordFilter: {
      status: false,
      words: "",
    },
    seconds: 1,
  });
  const fetching = async (uri, id, key) => {
    const data = await axios(uri + id + `&key=${key}`).catch((err) => err);
    return data;
  };

  const pickWin = () => {
    (async () => {
      if (video.status) {
        const res = await fetching(
          video.url,
          video.videoId,
          process.env.REACT_APP_SECRET_KEY
        ).catch((err) => console.log(err));
        const { data } = res;
        if (res.status === 200) {
          toast.success("Comments have been brought in successfully.", {
            theme: "colored",
          });
        } else {
          toast.error("An error occurred while shooting the video", {
            theme: "dark",
          });
        }
        data?.items?.forEach((element) => {
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

          //   authorDisplayName: snippet.authorDisplayName,
          //   authorChannelUrl: snippet.authorChannelUrl,
          //   authorProfileImageUrl: snippet.authorProfileImageUrl,
          //   textDisplay: snippet.textDisplay,
          //   textOriginal: snippet.textOriginal,
          //   updatedAt: snippet.updatedAt,
          // });
        });
        nextPageToken = data.nextPageToken;

        while (nextPageToken) {
          const { data } = await axios(
            `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&pageToken=${nextPageToken}&video_id=${video.videoId}&key=${process.env.REACT_APP_SECRET_KEY}`
          );
          data.items?.forEach((element) => {
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
            setVideo({ ...video, videoId: "" });
            break;
          }
          setVideo({
            ...video,
            comments: arr,
          });
        }
      } else {
        toast.error("Hata, Lütfen videoyu seçme butonuna tıklayın", {
          theme: "dark",
        });
      }
    })();
  };
  return (
    <div className="App container mt-5 d-flex flex-column justify-content-center align-items-center w-100 mb-5">
      <div className="logo d-flex justify-content-center align-items-center w-100 row mb-5">
        <img src="../assets/logo.png" alt="logo" className="col-12 col-lg-6" />
        <div className="d-flex justify-content-center col-12 col-lg-6">
          <h2 className="me-4">
            <span>Y</span>
            <span>O</span>
            <span>U</span>
            <span>T</span>
            <span>U</span>
            <span>B</span>
            <span>E</span>
          </h2>
          <h2>
            <span>C</span>
            <span>O</span>
            <span>M</span>
            <span>M</span>
            <span>E</span>
            <span>N</span>
            <span>T</span>
            <span>P</span>
            <span>I</span>
            <span>C</span>
            <span>K</span>
            <span>E</span>
            <span>R</span>
          </h2>
        </div>
      </div>
      <YoutubeUrl video={video} setVideo={setVideo} setComments={setComments} />

      <Winner
        video={video}
        setVideo={setVideo}
        pickWin={pickWin}
        comments={comments}
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
