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
};
export default function Preview({ formData }: Props) {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <h1>{formData.name}</h1>
      <p>{formData.content}</p>

      <div className="flex flex-col gap-[12px] w-full h-fit px-[12px] py-[24px] text-black">
        {formData.links
          .filter((link) => link.visible)
          .map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              className="flex flex-col w-full h-fit px-[8px] py-[12px] bg-white rounded"
            >
              <h3>{link.title}</h3>
              <p>{link.content}</p>
            </a>
          ))}
      </div>
    </div>
  );
}
