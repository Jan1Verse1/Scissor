import FAQAccordion from "./FAQAccordion";
import { FAQAccordionData } from "./AccordionContents";

const FAQs = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="text-center mb-8">
        <h3 className="text-5xl font-bold text-violet-900">FAQS</h3>
        <p className="text-3xl text-gray-700">
          Here are our frequently asked questions
        </p>
      </div>
      <div className="w-full max-w-7xl mb-8">
        {FAQAccordionData.map(({ Question, Answer }) => (
          <FAQAccordion key={Question} Question={Question} Answer={Answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
