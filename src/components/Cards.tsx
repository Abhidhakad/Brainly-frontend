import Card from "./Card";

const cardData = [
  {
    title: "Project Plan",
    tags: ["planning", "project"],
    addedDate: "2024-06-01",
    type: "note",
  },
  {
    title: "Meeting Notes",
    tags: ["meeting", "notes"],
    addedDate: "2024-05-28",
    type: "note",
  },
  {
    title: "Design Mockup",
    tags: ["design", "uiux"],
    addedDate: "2024-05-30",
    type: "note",
  },
  {
    title: "Research Summary",
    tags: ["research", "summary"],
    addedDate: "2024-06-02",
    type: "twitter",
  }
  
];

const Cards = () => {
  return (
    <>
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          tags={card.tags}
          addedDate={card.addedDate}
        />
      ))}
    </>
  );
};

export default Cards;
