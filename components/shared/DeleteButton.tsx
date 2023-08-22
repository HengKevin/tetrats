"use client";
import Image from "next/image";

import { deleteThread } from "@/lib/actions/thread.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  threadId: string;
  parentId: string | null;
  isComment?: boolean;
}
function DeleteButton({ threadId, parentId, isComment }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;
  const handleDelete = async () => {
    await deleteThread(JSON.parse(threadId), pathname);
    if (!parentId || !isComment) {
      router.push("/");
    }
  };
  return (
    <button
      type="button"
      onClick={handleDelete}
      className="hover:bg-gray-500 rounded-md p-2"
    >
      <Image
        src="/assets/delete.svg"
        alt="delete"
        width={25}
        height={25}
        className="cursor-pointer object-contain"
      />
    </button>
  );
}

export default DeleteButton;
