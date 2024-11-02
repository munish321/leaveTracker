import React from "react";
import { Separator } from "@/components/ui/separator";
import { sideBarList } from "@/utils/constants";
import { SideBar } from "@/components/SideBar";
import { TopBar } from "@/components/TopBar";

export const AdminLayout = ({ children }: any) => {
  return (
    <>
      <section className="flex flex-col w-auto h-screen overflow-hidden bg-[#f9fafb]">
        <TopBar />
        <Separator className="separator" />
        <div className="w-auto flex m-[20px] flex-1 gap-3">
          <div className="flex-[20%] rounded-[10px] py-[16px] bg-white h-full">
            <SideBar items={sideBarList} />
          </div>
          <div className="flex-[80%] rounded-[10px] bg-[#ffffff] p-[10px]">{children}</div>
        </div>
      </section>
    </>
  );
};
