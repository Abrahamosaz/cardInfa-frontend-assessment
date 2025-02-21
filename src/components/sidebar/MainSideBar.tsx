import Image from "next/image";
import { FooterLogo, LapoLogo } from "@/public/images";
import classNames from "classnames";
import { active, inactive, Logout } from "@/public/icons";
import { siderBarContent } from "@/contants";
import { usePathname, useRouter } from "next/navigation";
import useLayoutStore from "@/store/layout.store";

type SideBarItemProps = {
  active: boolean;
  onClickAction: () => void;
  activeIcon: string;
  inActiveIcon: string;
  label: string;
  labelStyle?: string;
};

const SideBarItem = ({
  active,
  onClickAction,
  activeIcon,
  inActiveIcon,
  label,
  labelStyle,
}: SideBarItemProps) => {
  return (
    <div
      onClick={onClickAction}
      className={classNames({
        "flex items-center gap-4 p-4 rounded-xl cursor-pointer": true,
        "bg-[#F6F6F6] border border-[#E2E2E2]": active,
      })}
    >
      <Image
        className="w-6 h-6"
        src={active ? activeIcon : inActiveIcon}
        alt={label}
      />
      <p
        className={classNames({
          "text-[#00000080]": !labelStyle && !active,
          "font-semibold text-[#014DAF]": active,
          labelStyle: !active,
        })}
      >
        {label}
      </p>
    </div>
  );
};

const MainSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleMenu } = useLayoutStore();

  return (
    <div className="bg-[hsl(0,0%,100%)] border-r-[1px] border-[#DEDEDF] p-4 pt-10 flex flex-col h-screen">
      {/* Fixed logo section */}
      <div className="mb-6">
        <Image src={LapoLogo} alt="logo" />
      </div>
      {/* Scrollable menu section */}
      <div className="mt-5 flex-1 overflow-y-auto no-scrollbar space-y-2">
        <SideBarItem
          active={pathname === "/dashboard"}
          onClickAction={() => {
            router.replace("/dashboard");
            toggleMenu();
          }}
          activeIcon={active.Dashboard}
          inActiveIcon={inactive.InActiveDashboard}
          label="Dashboard"
        />

        {/* menu items */}
        <div className="flex flex-col">
          <label className="p-4 py-2 text-sm font-medium text-[#7E8B9C]">
            MAIN MENU
          </label>
          {siderBarContent?.map((item) => (
            <SideBarItem
              key={item.id}
              active={pathname.startsWith(item.path)}
              onClickAction={() => {
                router.replace(item.path);
                toggleMenu();
              }}
              activeIcon={
                pathname.startsWith(item.path) ? item.activeIcon : item.icon
              }
              inActiveIcon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </div>
      {/* Fixed footer section */}
      <div className="mt-auto pt-4">
        <SideBarItem
          active={false}
          onClickAction={() => {}}
          activeIcon={Logout}
          inActiveIcon={Logout}
          label="Logout"
          labelStyle="text-[#121212]"
        />

        <div className="w-full mt-10">
          <p className="text-xs text-[#808080]">POWERED BY</p>
          <Image src={FooterLogo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
