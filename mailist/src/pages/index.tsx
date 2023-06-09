import Title from '@/components/Title';
import AddMail from '@/components/AddMail';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Wisetip - We help you choose carefully your products.</title>
        <link rel='icon' type='image/svg' href='/favicon.svg' />
      </Head>
      <h1 className='absolute text-2xl top-3 left-3'>
        wise<span className='text-blue-400'>tip</span>
      </h1>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col gap-5 items-center'>
          <Title />
          <AddMail />
          <p className='text-xl text-center'>
            We will collect tips from around the internet on how to choose the right [
            <span className='text-blue-400'>insert item</span>].
            <br />
            All the tips you need will be in one place, straight to the point !
          </p>
        </div>
      </div>
    </>
  );
}
