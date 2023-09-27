import { motion, useInView } from 'framer-motion';
import { type NextPage } from 'next';
import { useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';

import { CommandMenu } from '~/components/CommandMenu';
import MemberCard from '~/components/MemberCard';
import NewsLetter from '~/components/NewsLetter';

const Home: NextPage = () => {
  const ref1 = useRef<HTMLDivElement>(null);

  const isInView1 = useInView(ref1, {
    amount: 'all',
  });

  const variant1 = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const variant2 = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <section className='container sticky top-0 z-0 mx-auto mt-12 flex flex-col gap-12'>
        <div className='flex h-[75vh] flex-col items-center justify-center gap-12'>
          <motion.h1
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className='flex flex-col items-center gap-2 text-center text-4xl font-bold md:text-6xl'
          >
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
          </motion.h1>
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
      </section>
      <section className='sticky top-0 z-10 overflow-hidden rounded-lg border border-b-4 border-r-4 border-[#19A7CE] bg-[#e8f6fa] py-8'>
        <div className='space-y-12 px-6'>
          <motion.div
            ref={ref1}
            variants={variant1}
            initial='hidden'
            animate={isInView1 ? 'animate' : 'hidden'}
            className='flex flex-col gap-4'
          >
            <h3 className='text-3xl font-bold md:text-5xl'>What is wisetip</h3>
            <p className='text-sm leading-6 tracking-wide text-muted-foreground md:text-lg md:leading-7'>
              Useful tips to choose the right product are buried under a lot of noise (stretched
              intros, ads, sponsored content ...). We value your time and attention span, with
              wisetip all the tips you need are in one place, straight to the point.
            </p>
          </motion.div>
          <motion.div
            variants={variant2}
            initial='hidden'
            whileInView='animate'
            className='flex flex-col gap-4'
          >
            <h3 className='text-3xl font-bold md:text-5xl'>About us</h3>
            <p className='text-sm leading-6 tracking-wide text-muted-foreground md:text-lg md:leading-7'>
              We are dedicated to bootstrapping useful digital tools, solving one problem at a
              time, delivering high-quality content in the age of generative AI. With our solutions
              our priority is to safeguard attention, nurture social connections, and promote
              responsible spending. We generate profit from donations and one-time payments.
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            className='mx-auto flex w-full flex-col items-stretch gap-6 md:w-1/2 md:flex-row'
          >
            <MemberCard
              name='Ghribi Ouassim'
              githubLink='https://github.com/strlrd-29'
              linkedinLink='https://dz.linkedin.com/in/ouassimg'
              text='DROP TABLE users;'
              image='/assets/team/strlrd.png'
              website='https://ouassim-io.vercel.app'
            />
            <MemberCard
              name='Hachem Betrouni'
              githubLink='https://github.com/1hachem/'
              linkedinLink='https://www.linkedin.com/in/hachem-betrouni/'
              text='Typescript machine...'
              image='/assets/team/1hachem.png'
              website='https://www.1hachem.xyz'
            />
            <MemberCard
              name='Dhoha Tabouni'
              githubLink='https://github.com/1dhoha/'
              linkedinLink='https://www.linkedin.com/in/dhoha-tabouni/'
              text='jnp.array([[1,2],[3,4]])'
              image='/assets/team/1dhoha.jpeg'
              website=''
            />
          </motion.div>
          <NewsLetter />
        </div>
      </section>
    </>
  );
};

export default Home;
