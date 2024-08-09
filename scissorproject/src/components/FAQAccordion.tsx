import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

interface FAQAccordionProps {
  Question: string;
  Answer: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ Question, Answer }) => {
  const [isActive, setIsActive] = useState(false);

  const handleAccordionClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="border-t border-gray-300 py-4">
      <div
        className="flex justify-between items-center cursor-pointer text-gray-800 text-xl font-bold"
        onClick={handleAccordionClick}
      >
        <div>{Question}</div>
        <FontAwesomeIcon
          icon={isActive ? faCircleMinus : faCirclePlus}
          className="text-violet-900 text-xl"
        />
      </div>
      {isActive && (
        <div className="mt-2 text-gray-700 text-lg leading-relaxed">
          {Answer}
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
