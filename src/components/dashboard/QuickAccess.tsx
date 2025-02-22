import { dashboard } from "@/public/icons";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

const QuickAccess = () => {
  const quickAccess = [
    {
      name: "Manage a Card",
      icon: dashboard.cardShield,
    },
    {
      name: "Issue Instant Card",
      icon: dashboard.card,
    },
    {
      name: "Issue Personalized Card",
      icon: dashboard.cardEdit,
    },
    {
      name: "Review Card Requests",
      icon: dashboard.cardAdd,
    },
  ];
  return (
    <div className="bg-white flex flex-col gap-2.5 px-3 py-3 xs:px-4 xs:py-4 lg:px-5 lg:py-5 border border-[#E2E2E2] rounded-[0.625rem]">
      <h2 className="text-base font-medium text-[#121212]">
        Your Quick Access
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 min-[1340px]:grid-cols-4 2xl:gap-3 gap-2">
        {quickAccess.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 2xl:gap-4 rounded-md bg-[#F1F7FF] px-4 2xl:px-5 py-3"
          >
            <div className="2xl:w-10 2xl:h-10 w-8 h-8 rounded-full bg-[#014DAF] flex items-center justify-center p-1">
              <Image src={item.icon} alt={item.name} className="2xl:w-5 w-4" />
            </div>
            <div className="flex items-center 2xl:gap-2 gap-1">
              <p className="text-sm font-medium text-[#121212]">{item.name}</p>
              <FiChevronRight className="text-lg text-[#808080]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
