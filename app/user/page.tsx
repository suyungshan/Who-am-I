"use client";

import ClientForm from "@/components/form/ClientForm";
import PreviewBlock from "@/components/form/PreviewBlock";
import { useState } from "react";
export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    links: [] as {
      id: number;
      title: string;
      link: string;
      content: string;
      visible: boolean;
    }[],
  });
  return (
    <div className="flex h-screen">
      {/* 輸入區 */}
      <aside className="w-1/2 p-6 flex flex-col items-center overflow-y-auto border-r border-gray-200 ">
        <h1 className="text-2xl font-bold mb-4">自我介紹產生器 🧑‍💻</h1>

        {/* 表單區塊：可抽成元件 */}
        <ClientForm formData={formData} setFormData={setFormData} />

        {/* 匯出區：複製/匯出按鈕區塊 */}
        <div className="mt-8 space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            匯出 Markdown
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            匯出 PDF
          </button>
        </div>
      </aside>

      {/* 預覽區 */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <PreviewBlock formData={formData}></PreviewBlock>
      </div>
    </div>
  );
}
