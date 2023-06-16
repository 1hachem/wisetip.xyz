import type { Dispatch, SetStateAction } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn, formatCompactNumber } from '~/utils';
import { api } from '~/utils/api';
import { useAuth } from '~/hooks/use-auth';
import { useRouter } from 'next/router';
import { useToast } from '~/hooks/use-toast';

interface TipProps {
  tipId: string;
  text: string;
  upvotes: number;
  downvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Tip = ({ text, upvotes, tipId, downvotes, upvoted, downvoted, setIsLoading }: TipProps) => {
  const router = useRouter();
  const utils = api.useContext();
  const { toast } = useToast();
  const { session } = useAuth();

  const { mutateAsync: mutateUpvote } = api.item.upvote.useMutation();

  const { mutateAsync: mutateRemoveUpvote } = api.item.removeUpvote.useMutation();

  const { mutateAsync: mutateDownvote } = api.item.downvote.useMutation();

  const { mutateAsync: mutateRemoveDownvote } = api.item.removeDownvote.useMutation();

  const handleUpvote = async () => {
    setIsLoading(true);
    try {
      if (!upvoted && !downvoted) {
        await mutateUpvote({ tipId: tipId, userId: session?.user.id as string });
      } else if (upvoted && !downvoted) {
        await mutateRemoveUpvote({ tipId: tipId, userId: session?.user.id as string });
      } else if (!upvoted && downvoted) {
        await mutateUpvote({ tipId: tipId, userId: session?.user.id as string });
        await mutateRemoveDownvote({ tipId: tipId, userId: session?.user.id as string });
      }
      await utils.item.getOne.invalidate(router.query.id as string);
      setIsLoading(false);
    } catch (err) {
      toast({
        title: 'Sanimate-pulse bg-slate-50omething went wrong when upvoting',
        description: 'Something went wrong on our side, try again later.',
      });
    }
  };

  const handleDownvote = async () => {
    setIsLoading(true);
    try {
      if (!downvoted && !upvoted) {
        await mutateDownvote({ tipId: tipId, userId: session?.user.id as string });
      } else if (downvoted && !upvoted) {
        await mutateRemoveDownvote({ tipId: tipId, userId: session?.user.id as string });
      } else if (!downvoted && upvoted) {
        await mutateDownvote({ tipId: tipId, userId: session?.user.id as string });
        await mutateRemoveUpvote({ tipId: tipId, userId: session?.user.id as string });
      }
      await utils.item.getOne.invalidate(router.query.id as string);
      setIsLoading(false);
    } catch (err) {
      toast({
        title: 'Something went wrong when upvoting',
        description: 'Something went wrong on our side, try again later.',
      });
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className='flex items-center justify-between gap-4 px-2 py-4 font-medium'
    >
      <p className='text-primary'>{text}</p>
      <div className='flex'>
        <div className='flex items-center gap-1 rounded-bl-full rounded-tl-full border border-primary py-1 pl-2 pr-2'>
          <motion.button
            onClick={() => {
              void handleUpvote();
            }}
            whileTap={{ scale: 1.1, y: -5 }}
            className='outline-none'
          >
            <ThumbsUp
              className={cn('h-4 w-4 hover:fill-[#19A7CE]', {
                'fill-[#19A7CE] stroke-primary': upvoted,
              })}
            />
          </motion.button>
          <p className='text-sm font-bold'>{formatCompactNumber(upvotes)}</p>
        </div>
        <div className='flex items-center gap-1 rounded-br-full rounded-tr-full border border-primary py-1 pl-2 pr-2 '>
          <p className='text-sm font-bold'>{formatCompactNumber(downvotes)}</p>
          <motion.button
            onClick={() => {
              void handleDownvote();
            }}
            className='outline-none'
            whileTap={{ scale: 1.1, y: 5 }}
          >
            <ThumbsDown
              className={cn('h-4 w-4 hover:fill-[#FF6961]', {
                'fill-[#FF6961] stroke-primary': downvoted,
              })}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Tip;
