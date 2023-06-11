import Image from 'next/image';

const Header = () => {
  return (
    <header className='py-2 flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Image src='/logo.svg' alt='Wisetip logo' height={20} width={20} />
        <h1>wisetip</h1>
      </div>
      <button className='pointer-events-none opacity-50 py-1 px-4 rounded-md border border-black'>
        Sign in
      </button>
    </header>
  );
};

export default Header;
