import React, { useEffect } from "react";
import Winner from "../components/Winner";
import YoutubeUrl from "../components/YoutubeUrl";

export default function Youtube({
  video,
  setVideo,
  setComments,
  pickWin,
  pick,
  comments,
  setWinners,
  winners,
}) {
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerHTML = "Free Youtube Comment Picker";
  }, []);
  return (
    <div>
      <YoutubeUrl video={video} setVideo={setVideo} setComments={setComments} />
      <Winner
        video={video}
        setVideo={setVideo}
        pickWin={pickWin}
        comments={comments}
        winners={winners}
        setWinners={setWinners}
        setComments={setComments}
      />
    </div>
  );
}
