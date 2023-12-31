import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import DeleteButton from "../shared/DeleteButton";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  threadImg: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = async ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  threadImg,
  isComment,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-2xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      } `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div>
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base1-semibold text-light-1 hover:text-secondary-500">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            {threadImg && threadImg !== "" && (
              <Image
                src={threadImg}
                alt="Thread Image"
                layout="responsive"
                width={500}
                height={500}
                className="mt-2 rounded-md object-cover"
              />
            )}

            <div className={`${isComment && "mt-5 flex flex-col gap-3"}`}>
              <div className="mt-2 flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />

                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>

                <Image
                  src="/assets/repost.svg"
                  alt="respost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {/* render the children components, the comments */}
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isComment && author.id === currentUserId && (
          <DeleteButton
            threadId={JSON.stringify(id)}
            parentId={parentId}
            isComment={isComment}
          />
        )}
      </div>
      {/* delete thread */}
      {/* show comments logos */}
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} -{" "}
            <span className="hover:text-third-500">{community.name}</span>{" "}
            Community
          </p>

          <Image
            src={community.image}
            alt="Community Logo"
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
