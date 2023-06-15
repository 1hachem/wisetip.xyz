import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { exampleTips } from '~/config';
import ExampleTip from './ExampleTip';

export const FADE_IN_ANIMATION_VARIANTS = {
  initial: { y: 100, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
    },
  }),
};

const Examples = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -10 },
  };
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      variants={list}
      className='flex flex-col items-center justify-between rounded-lg border border-b-4 border-r-4 border-primary bg-[#FD7B53] p-4 shadow-lg md:flex-row'
      whileInView='visible'
    >
      <motion.div variants={item} className='flex w-full flex-col gap-2 md:w-1/4'>
        <div className='flex font-heading text-3xl' ref={ref}>
          {'Sleeping Bag'.split('').map((letter, idx) => (
            <motion.h1
              key={idx}
              variants={FADE_IN_ANIMATION_VARIANTS}
              initial='initial'
              animate={isInView ? 'animate' : 'initial'}
              custom={idx}
            >
              {letter}
            </motion.h1>
          ))}
        </div>
      </motion.div>
      <motion.div
        variants={item}
        className='flex w-full flex-col gap-2'
        initial='hidden'
        animate='visible'
      >
        {exampleTips.map((tip) => (
          <ExampleTip text={tip.text} upvotes={tip.upvotes} key={tip.text} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Examples;
