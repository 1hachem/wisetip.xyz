import { motion } from 'framer-motion';

import Tip from '@/components/Tip';
import { exampleTips } from '@/config';

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
      className='flex flex-col md:flex-row items-center justify-between p-4 border border-b-4 border-r-4 border-primary rounded-lg shadow-lg'
      whileInView='visible'
    >
      <motion.div
        variants={item}
        className='flex flex-col gap-2 w-full'
        initial='hidden'
        animate='visible'
      >
        {exampleTips.map((tip) => (
          <div key={tip.text}>
            <Tip text={tip.text} upvotes={tip.upvotes} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Examples;
