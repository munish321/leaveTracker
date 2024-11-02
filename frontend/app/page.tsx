"use client"
import { AdminLayout } from "./layout/adminLayout";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import DoughnutChart from "@/components/charts/DonutChart";
export default function Home() {
  const { userData } = useSelector(userState);
 
  return (
    <AdminLayout>
    <main>
        <div className="flex justify-between">
          <div>
            <h2>Good AfterNoon, {userData?.firstName}</h2>
            <span>You have 2 leaves pending</span>
          </div>
          <div>
             {userData._id && <DoughnutChart />}
          </div>
          <div>
            <span>{new Date().getFullYear()}</span>
            <i></i>
          </div>
        </div>
    </main>
    </AdminLayout>
  );
}
