import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { ListIcon } from "../icons/LinkIcon";

export const recognizeIcon = (iconType: string) => {
  const type = iconType.toLowerCase();

  switch (type) {
    case "youtube":
      return <YoutubeIcon />;

    case "x":
    case "twitter":
      return <TwitterIcon />;

    case "linkedin":
    case "link":
      return <ListIcon />;

    default:
      return <DocumentsIcon />;
  }
};
