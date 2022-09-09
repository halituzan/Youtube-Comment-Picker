import { toast } from "react-toastify";

export const checkLink = (video, setVideo, setComments) => {
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const result = video.link.match(regex);

  if (result) {
    toast.success("Correct!", { theme: "colored" });

    setVideo({
      ...video,
      status: true,
      videoId: result[1],
      reVideoId: result[1],
      pick: null,
    });
    setComments([]);

    return true;
  } else {
    toast.error(
      "There is no such link or you did not enter the url correctly.",
      { theme: "dark" }
    );
    setVideo({ ...video, status: false, videoId: "" });

    return false;
  }
};
