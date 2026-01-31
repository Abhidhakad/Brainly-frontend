import Card from "./Card";
import { useContentStore } from "../store/useContentStore";
import { formatDate } from "../utils/dateFormat";

const Cards = () => {
  const cardData = useContentStore((state) => state.contents);

  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {cardData.map((card) => (
        <Card
          key={card._id}
          _id={card._id}
          type={card.type}
          link={card.link}
          title={card.title}
          tags={card.tags}
          addedDate={formatDate(card.createdAt)}
          descrption={card.description}
        />
      ))}
    </div>
  );
};

export default Cards;
