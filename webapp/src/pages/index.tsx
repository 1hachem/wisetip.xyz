import { type NextPage } from 'next';

import { Typewriter } from 'react-simple-typewriter';

import { Search } from '~/components/Icons';
import Tip from '~/components/Tip';

import { exampleTips } from '~/config';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col gap-12 mt-12'>
      <div className='flex flex-col justify-center items-center gap-12'>
        <h1 className='text-5xl font-bold flex flex-col items-center gap-2'>
          How to choose the right{' '}
          <span className='text-blue-500'>
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
              cursorStyle='_'
              typeSpeed={100}
              deleteSpeed={30}
              delaySpeed={500}
            />
          </span>
        </h1>
        <div className='w-full md:w-[50vw] flex items-center justify-between gap-4'>
          <input
            className='flex-1 border-none bg-slate-100 focus:border-none outline-none py-1 px-2 rounded-full'
            placeholder='Search for your first Item. '
          />
          <Search className='w-4 h-4' />
        </div>
      </div>
      <div className='flex flex-col gap-6 border border-slate-200 bg-slate-50 rounded-md p-4 max-w-3xl mx-auto'>
        <h1 className='text-3xl'>
          Example of tips for a <span className='text-blue-500'>sleeping bag</span>
        </h1>
        <div className='space-y-2'>
          {exampleTips.map((tip) => (
            <Tip key={tip.text} text={tip.text} upvotes={tip.upvotes} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
