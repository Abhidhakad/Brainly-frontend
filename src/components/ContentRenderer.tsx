import {
  YouTubeEmbed,
  XEmbed,
  // LinkedInEmbed,
} from "react-social-media-embed";

interface ContentRendererProps {
  type: string;
  link: string;
}

const ContentRenderer = ({ type, link }: ContentRendererProps) => {
  switch (type) {
    case "youtube":
      return (
        <YouTubeEmbed
          url={link}
          width="100%"
          height={180}
        />
      );

    case "twitter":
      return (
        <XEmbed
          url={link}
          width="250px"
          height={180}
        />
      );

    case "linkedin":
      return (
        // <LinkedInEmbed
        //   url={link}
        //   width="100%"
        // />
        simpleBox(link)
      );

    case "document":
      return simpleBox("📄 Document");

    case "github":
      return simpleBox("💻 GitHub preview coming soon");

    case "reddit":
      return simpleBox("👽 Reddit preview coming soon");

    case "other":
    default:
      return simpleBox("🔗 Link");
  }
};

export default ContentRenderer;


const simpleBox = (label: string) => (
  <div className="w-full h-100 bg-gray-200
      rounded-md flex items-center justify-center overflow-hidden relative">
    <span className="sr-only">{label}</span>

    <div className="text-gray-500 text-sm
        flex flex-col items-center
        transition-transform duration-300
        group-hover:scale-105">
      <span className="text-2xl">📄</span>
      <span>Preview not available</span>
    </div>
  </div>
);

