"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Trash2, EllipsisVertical } from "lucide-react";
type Props = {
  id: number;
  index: number;
  data: {
    title: string;
    link: string;
    content: string;
    visible: boolean;
  };
  onDelete: (id: number) => void;
  onChange: (
    index: number,
    field: "title" | "link" | "content",
    value: string
  ) => void;
  onHide: (id: number) => void;
};

export default function LinkBlock({
  id,
  index,
  data,
  onDelete,
  onChange,
  onHide,
}: Props) {
  const fields: { label: string; name: "title" | "link" | "content" }[] = [
    { label: "Link", name: "link" },
    { label: "Title", name: "title" },
    { label: "Content", name: "content" },
  ];

  return (
    <div className="flex flex-col w-full border-1 border-amber-50 rounded px-[8px]">
      <div className="flex w-full h-fit gap-[8px] items-center">
        <EllipsisVertical className="h-full cursor-pointer" />

        {/* 中間內容 */}
        <div className="flex flex-col  gap-[8px]  w-full h-fit py-[20px] px-[12px] border-l-1 border-r-1 border-amber-50">
          {fields.map((field) => (
            <div key={field.name} className="flexitems-center justify-center ">
              <Input
                value={data[field.name]}
                placeholder={field.label}
                onChange={(e) => onChange(index, field.name, e.target.value)}
              ></Input>
            </div>
          ))}
        </div>
        {/* 右側工具欄 */}
        <div className="flex flex-col h-full items-end justify-between py-[20px] ">
          <Trash2
            className="flex w-full justify-center cursor-pointer"
            onClick={() => onDelete(id)}
          />
          <Switch
            type="button"
            className="cursor-pointer bg-white   data-[state=checked]:bg-green-500 "
            checked={data.visible}
            onCheckedChange={() => onHide(id)}
          />
        </div>
      </div>
    </div>
  );
}
