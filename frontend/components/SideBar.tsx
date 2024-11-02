import Link from "next/link";
import { usePathname  } from "next/navigation";
interface SideBarProps {
  items: Array<Items>;
}
interface Items {
  icon?: string;
  label: string;
  url?: string;
}
export const SideBar = ({ items }: SideBarProps) => {
  const currentPath = usePathname();

  return (
      <ul className="px-3">
        {items.map((item, index) => {
          return (
            <Link href={item.url || ""} key={index}>
              <li
                className={`group border-l-[8px] border-transparent hover:border-l-[#c92940] py-[3px] px-[15px] w-full cursor-pointer ${currentPath === item.url && "border-l-[#c92940]"}`}
              >
                <i
                  className={`${item.icon} text-[#a9a9a9] group-hover:text-[#c92940] mr-2 ${currentPath === item.url && "text-[#c92940]"} `}
                ></i>
                <span className={`text-[#a9a9a9] text-[14px] group-hover:text-[#c92940] font-normal ${currentPath === item.url && "text-[#c92940]"}`}>
                  {item.label}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
  );
};
