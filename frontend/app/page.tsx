"use client"
import { AdminLayout } from "./layout/adminLayout";
export default function Home() {

  return (
    <AdminLayout>
    <main>
        <div className="flex justify-between">
          <div>
            <h2>Good AfterNoon, Munish</h2>
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
