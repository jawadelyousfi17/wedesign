import { Check, ChevronDown } from "lucide-react";
import React from "react";
import PathCard from "./pathCard";
import ModulCard from "./ModulCard";
import BackgroundPattern from "@/components/background/backgroundPattern";

const pathCards = [
  {
    id: 1,
    title: "The semantic bone",
    description: "Html skeleton, div, and nav elements",
    status: "Completed" as const,
  },
  {
    id: 2,
    title: "Text formatting basics",
    description: "Headings, paragraphs, and line breaks",
    status: "Completed" as const,
  },
  {
    id: 3,
    title: "Lists and links",
    description: "Creating ordered, unordered lists and hyperlinks",
    status: "Completed" as const,
  },
  {
    id: 4,
    title: "Images and multimedia",
    description: "Embedding images, audio, and video elements",
    status: "Current" as const,
  },
  {
    id: 5,
    title: "HTML forms fundamentals",
    description: "Input fields, buttons, and form validation",
    status: "Locked" as const,
  },
];

const Main = () => {
  return (
    <div className="p-8 w-full">
      <ModulCard
        moduleNumber={1}
        title="HTML Fondamentals"
        status="progress"
        completedChallenges={4}
        totalChallenges={4}
      />
      <div className="flex flex-col gap-0 p-4  relative border border-t-0">
        {pathCards.map((card) => (
          <PathCard
            key={card.id}
            title={card.title}
            description={card.description}
            status={card.status}
          />
        ))}
      </div>

      <section className="flex flex-col mt-[1rem]">
        <ModulCard
          moduleNumber={1}
          title="HTML Fondamentals"
          status="Locked"
          completedChallenges={4}
          totalChallenges={4}
        />
        <div className="flex flex-col gap-2 pl-12 mt-4  relative">
          <div className="absolute -top-4 left-6 h-[calc(100%+2rem)]  border-l border-border"></div>
          {pathCards.map((card) => (
            <PathCard
              key={card.id}
              title={card.title}
              description={card.description}
              status={"Locked"}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
