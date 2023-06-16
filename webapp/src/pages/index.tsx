import { type NextPage } from 'next';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

import { CommandMenu } from '~/components/CommandMenu';
import Examples from '~/components/Examples';

const Home: NextPage = () => {
  return (
    <div className='mt-12 flex h-full flex-col gap-12'>
      <div className='flex h-[50vh] flex-col items-center justify-center gap-12'>
        <h1 className='flex flex-col items-center gap-2 text-center font-heading text-3xl font-bold md:text-7xl'>
          How to choose the right{' '}
          <span className='text-[#19A7CE]'>
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
          className='flex w-full justify-center'
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
    </div>
  );
};

export default Home;
