import Thread from "@/lib/models/thread.model";
import Image from "next/image";

interface Props {
  id: string;
  currentUserId: string;
}

async function LikeBotton({ id, currentUserId }: Props) {
  let like = "/assets/heart-gray.svg";
  const handleLike = async () => {
    const thread = await Thread.findById(id);
    if (!thread.isLikedBy.include(currentUserId)) {
      // like the thread
      await thread.updateOne({ $push: { isLikedBy: currentUserId } });
      await thread.save();
      like = "/assets/heart-fill.svg";
      // update the state
      // update the database
    } else {
      // unlike the thread
      await thread.updateOne({ $pull: { isLikedBy: currentUserId } });
      await thread.save();
      like = "/assets/heart-gray.svg";
      // update the state
      // update the database
    }
  };
  return (
    <div onClick={handleLike}>
      <img
        src={like}
        alt="Like"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
    </div>
  );
}
export default LikeBotton;
