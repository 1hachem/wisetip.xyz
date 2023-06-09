import { Typewriter } from 'react-simple-typewriter';

const Title = () => {
  return (
    <div className='flex'>
      <h1 className='md:text-7xl text-xl'>
        How to choose the right{' '}
        <span className='text-blue-400'>
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
    </div>
  );
};

export default Title;
