import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn, formatCompactNumber } from '~/utils';

interface ExampleTipProps {
  text: string;
  upvotes: number;
}

const ExampleTip = ({ text, upvotes }: ExampleTipProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  const [numberOfUpvotes, setUpvotes] = useState(upvotes);

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
              setUpvotes(numberOfUpvotes + 1);
              setUpvoted(!upvoted);
              setDownvoted(false);
            }}
            whileTap={{ scale: 1.1, y: -5 }}
            className='outline-none'
          >
            <ThumbsUp
              className={cn('h-4 w-4', {
                'fill-primary stroke-primary': upvoted,
              })}
            />
          </motion.button>
          <p className='text-sm font-bold'>{formatCompactNumber(numberOfUpvotes)}</p>
        </div>
        <div className='flex items-center rounded-br-full rounded-tr-full border border-primary py-1 pl-2 pr-2 '>
          <motion.button
            onClick={() => {
              setUpvotes(numberOfUpvotes - 1);
              setUpvoted(false);
              setDownvoted(!downVoted);
            }}
            className='outline-none'
            whileTap={{ scale: 1.1, y: 5 }}
          >
            <ThumbsDown
              className={cn('h-4 w-4 hover:fill-primary hover:stroke-primary', {
                'fill-primary stroke-primary': downVoted,
              })}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExampleTip;
