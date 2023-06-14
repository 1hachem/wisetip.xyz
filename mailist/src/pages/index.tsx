import Title from '@/components/Title';
import AddMail from '@/components/AddMail';
import Head from 'next/head';
import Examples from '@/components/Examples';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wisetip - We help you choose carefully your products.</title>
        <link rel='icon' type='image/svg' href='/favicon.svg' />
      </Head>
      <h1 className='absolute text-2xl top-3 left-3'>
        wise<span className='text-blue-400'>tip</span>
      </h1>
      <div className='flex flex-col justify-center items-center gap-8 mt-44 '>
        <div className='flex flex-col gap-5 items-center h-[50vh]'>
          <Title />
          <AddMail />
          <p className='text-xl text-center'>
            We will collect tips from around the internet on how to choose the right [
            <span className='text-blue-400'>insert item</span>].
            <br />
            All the tips you need will be in one place, straight to the point !
          </p>
        </div>
        <h2 className='font-heading text-3xl md:text-5xl gap-y-2 font-bold'>See it in action...</h2>
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
}
