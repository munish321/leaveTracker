"use client"
import { AdminLayout } from "./layout/adminLayout";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
export default function Home() {
  const { userData } = useSelector(userState);
  return (
    <AdminLayout>
    <main>
        <div className="flex justify-between">
          <div>
            <h2>Good AfterNoon, {userData?.name}</h2>
            <span>You have 2 leaves pending</span>
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
