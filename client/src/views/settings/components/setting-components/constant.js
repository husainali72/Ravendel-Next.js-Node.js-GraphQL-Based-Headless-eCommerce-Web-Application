import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
export const socialMediaIconSetter = (IconName, setIcon) => {
    if (IconName === "facebook")
      return <FacebookIcon sx={{ color: "blue", m: "5px" }} />;
    if (IconName === "instagram")
      return <InstagramIcon sx={{ color: "pink", m: "5px" }} />;
    if (IconName === "youtube")
      return <YouTubeIcon sx={{ color: "red", m: "5px" }} />;
    if (IconName === "twitter")
      return <TwitterIcon sx={{ color: "skyblue", m: "5px" }} />;
  };
  export const menuItem = [
    { name: "instagram", handle: "" },
    { name: "facebook", handle: "" },
    { name: "twitter", handle: "" },
    { name: "youtube", handle: "" },
  ];