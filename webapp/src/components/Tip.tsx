import { useState } from 'react';

import { ThumbsUp } from '~/components/Icons/ThumbsUp';
import { ThumbsDown } from '~/components/Icons/ThumbsDown';

import { cn, formatCompactNumber } from '~/utils';

interface TipProps {
  text: string;
  upvotes: number;
}

const Tip = ({ text, upvotes }: TipProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  const [numberOfUpvotes, setUpvotes] = useState(upvotes);

  return (
    <div className='flex items-center gap-2 p-2 bg-slate-100 border border-slate-300 rounded-md w-full'>
      <div className='flex flex-col items-start w-[7%] gap-1'>
        <button
          onClick={() => {
            setUpvotes(numberOfUpvotes + 1);
            setUpvoted(!upvoted);
            setDownvoted(false);
          }}
          className='outline-none'
        >
          <ThumbsUp
            className={cn('w-4 h-4 hover:fill-blue-500 hover:stroke-blue-500 transition-all', {
              'fill-blue-500 stroke-blue-500': upvoted,
            })}
          />
        </button>

        <p className='font-bold text-blue-500 text-sm'>{formatCompactNumber(numberOfUpvotes)}</p>
        <button
          onClick={() => {
            setUpvotes(numberOfUpvotes - 1);
            setUpvoted(false);
            setDownvoted(!downVoted);
          }}
          className='outline-none'
        >
          <ThumbsDown
            className={cn('w-4 h-4 hover:fill-[#FF4500] hover:stroke-[#FF4500]', {
              'fill-[#FF4500] stroke-[#FF4500]': downVoted,
            })}
          />
        </button>
      </div>
      <p className='w-[93%] text-slate-700'>{text}</p>
    </div>
  );
};

export default Tip;
