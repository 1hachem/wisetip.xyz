import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { Separator } from '~/components/ui/Separator';
import Tip from '~/components/Tip';
import { exampleTips } from '~/config';

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
  console.info('Sleeping Bag'.split(''));

  return (
    <motion.div
      variants={list}
      className='flex flex-col md:flex-row items-center justify-between p-4 bg-[#FD7B53] border border-b-4 border-r-4 border-primary rounded-lg shadow-lg'
      whileInView='visible'
    >
      <motion.div variants={item} className='flex flex-col gap-2 w-full md:w-1/4'>
        <div className='flex text-3xl font-heading' ref={ref}>
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
        className='flex flex-col gap-2 w-full'
        initial='hidden'
        animate='visible'
      >
        {exampleTips.map((tip) => (
          <div key={tip.text}>
            <Tip text={tip.text} upvotes={tip.upvotes} />
            <Separator className='bg-primary' />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Examples;
