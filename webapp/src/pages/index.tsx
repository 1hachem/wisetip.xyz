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
          <span className='text-blue-400'>
            <Typewriter
              words={[
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
      <div className='space-y-8'>
        <h2
          className='font-heading text-xl md:text-5xl
'
        >
          See it in action...
        </h2>
        <h2 className='font-heading text-xl md:text-4xl'>
          How to choose the right{' '}
          <span className='text-blue-400'>
            <Typewriter
              words={['sleeping bag ?']}
              loop={1}
              typeSpeed={100}
              deleteSpeed={30}
              delaySpeed={500}
            />
          </span>
        </h2>
        <Examples />
      </div>
    </div>
  );
};

export default Home;
