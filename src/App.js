import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { en, tr } from "./lang/language";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Youtube from "./pages/Youtube";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    if (localStorage.getItem("Lang")) {
    } else localStorage.setItem("Lang", "English");
  }, []);
  let nextPageToken;
  const [comments, setComments] = useState([]);
  const [winners, setWinners] = useState([]);
  const [video, setVideo] = useState({
    YTUrl:
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100",
    link: "",
    status: false,
    resultPage: 0,
    videoId: "",
    reVideoId: "",
    pick: [],
    sameFilter: false,
    wordFilter: {
      status: false,
      words: "",
    },
    seconds: 1,
  });

  const fetching = async (uri, id, key) => {
    const data = await axios(uri + `&video_id=${id}&key=${key}`).catch(
      (err) => err
    );
    return data;
  };

  const pickWin = () => {
    (async () => {
      if (video.status) {
        const res = await fetching(
          video.YTUrl,
          video.videoId,
          process.env.REACT_APP_SECRET_KEY
        ).catch((err) => console.log(err));
        const { data } = res;
        if (res.status === 200) {
          toast.success(
            localStorage.getItem("Lang") === "English"
              ? en.dataSuccess
              : tr.dataSuccess,
            {
              theme: "colored",
            }
          );
        } else {
          toast.error(
            localStorage.getItem("Lang") === "English"
              ? en.serverError
              : tr.serverError,
            {
              theme: "dark",
            }
          );
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
        });
        nextPageToken = data.nextPageToken;
        setVideo({ ...video, videoId: "" });

        while (nextPageToken) {
          const { data } = await axios(
            `${video.YTUrl}&pageToken=${nextPageToken}&video_id=${video.videoId}&key=${process.env.REACT_APP_SECRET_KEY}`
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
          setVideo({ ...video, videoId: "" });

          if (!nextPageToken) {
            setVideo({ ...video, videoId: "" });
            break;
          }
        }
      } else {
        toast.error(
          localStorage.getItem("Lang") === "English"
            ? en.clickError
            : tr.clickError,
          {
            theme: "dark",
          }
        );
      }
    })();
  };
  return (
    <div className="App d-flex flex-column justify-content-center align-items-center w-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/youtube"
          element={
            <Youtube
              video={video}
              setVideo={setVideo}
              setComments={setComments}
              pickWin={pickWin}
              comments={comments}
              setWinners={setWinners}
              winners={winners}
            />
          }
        ></Route>
      </Routes>
      <Footer />
      {/* <LanguageSelect /> */}

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
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
