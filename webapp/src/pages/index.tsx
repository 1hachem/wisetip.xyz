import { type NextPage } from 'next';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

import { CommandMenu } from '~/components/CommandMenu';
import Examples from '~/components/Examples';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col gap-12 mt-12 h-full'>
      <div className='flex flex-col justify-center items-center gap-12 h-[50vh]'>
        <h1 className='font-heading text-3xl md:text-7xl font-bold flex flex-col items-center text-center gap-2'>
          How to choose the right{' '}
          <span className='text-[#025464]'>
            <Typewriter
              words={[
                'sleeping bag ?',
                'jump rope ?',
                'fish ?',
                'watch ?',
                'camera ?',
                'kitchen knife ?',
                'hiking boots ?',
                'backpack ?',
                'umbrella ?',
                'sunglasses ?',
                'yoga mat ?',
                'toothbrush ?',
              ]}
              loop={false}
              cursor
              cursorStyle='|'
              typeSpeed={100}
              deleteSpeed={30}
              delaySpeed={500}
            />
          </span>
        </h1>
        <motion.div
          className='w-full flex justify-center'
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <CommandMenu />
        </motion.div>
      </div>
      <div className='space-y-8'>
        <h2 className='text-xl md:text-5xl text-[#E57C23] font-heading'>
          Let&apos;s see it in action...
        </h2>
        <Examples />
      </div>
    </div>
  );
};

export default Home;
