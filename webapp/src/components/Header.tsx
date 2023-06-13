import { useAuth } from '~/hooks/use-auth';

const Header = () => {
  const { signIn, signOut, status } = useAuth();
  return (
    <header className='py-2 flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <h1>wisetip</h1>
      </div>
      <button
        className='py-1 px-4 rounded-md border border-slate-400 hover:bg-slate-100 transition-all'
        onClick={() => {
          if (status === 'authenticated') void signOut();
          else void signIn('github');
        }}
      >
        {status === 'authenticated' ? 'Log out' : 'Sign In'}
      </button>
    </header>
  );
};

export default Header;
