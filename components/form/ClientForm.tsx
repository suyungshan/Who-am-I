"use client";

import { useState } from "react";
import AddLinkButton from "../AddLinkButton";
import LinkBlock from "../LinkBlock";

type Props = {
  formData: {
    name: string;
    content: string;
    links: {
      id: number;
      title: string;
      link: string;
      content: string;
      visible: boolean;
    }[];
  };
  setFormData: React.Dispatch<React.SetStateAction<Props["formData"]>>;
};

export default function ClientForm({ formData, setFormData }: Props) {
  const [linkBlocks, setLinkBlocks] = useState<number[]>([]);
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const showMoreLink = () => {
    const newId = Date.now();
    setLinkBlocks((prev) => [...prev, newId]);
    setFormData((prev) => ({
      ...prev,
      links: [
        ...prev.links,
        { id: newId, title: "", link: "", content: "", visible: true },
      ],
    }));
  };

  const deleteLinkBlock = (id: Number) => {
    // 移除 linkBlock 項目
    setLinkBlocks((prev) => prev.filter((blockId) => blockId !== id));

    // 同步移除 formData.links 中對應的項目
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((item) => item.id !== id),
    }));
  };

  const toggleVisibility = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    }));
  };

  const swithLinkBlock = (id: number) => {};

  const handleLinkChange = (
    index: number,
    field: "title" | "link" | "content",
    value: string
  ) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;

    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  return (
    <form className="flex flex-col w-[70%] justify-center items-center gap-[20px]">
      <div className="flex flex-col w-full">
        <label className="flex font-medium">Name</label>
        <input
          type="text"
          className="mt-1 w-full border px-3 py-2 rounded"
          value={formData.name}
          placeholder="請輸入姓名"
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="flex font-medium">Bio</label>
        <textarea
          className="mt-1 w-full border px-3 py-2 rounded"
          value={formData.content}
          placeholder="寫些什麼吧"
          onChange={(e) => handleChange("content", e.target.value)}
        ></textarea>
      </div>
      <AddLinkButton showMoreLink={showMoreLink}></AddLinkButton>

      {linkBlocks.map((id, index) => (
        <LinkBlock
          key={id}
          id={id}
          index={index}
          data={formData.links[index]}
          onDelete={deleteLinkBlock}
          onChange={handleLinkChange}
          onHide={toggleVisibility}
        ></LinkBlock>
      ))}

      {/* 更多輸入欄位，如工作經驗、專案經驗、語氣選擇... */}
    </form>
  );
}
