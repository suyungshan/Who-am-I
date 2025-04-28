"use client";

type Props = { showMoreLink: () => void };

export default function AddLinkButton({ showMoreLink }: Props) {
  return (
    <button
      type="button"
      className="w-full border border-neutral-400 py-2 rounded cursor-pointer"
      onClick={showMoreLink}
    >
      Add Link
    </button>
  );
}
