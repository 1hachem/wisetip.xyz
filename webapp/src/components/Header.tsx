import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/Avatar';
import { Button } from '~/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/DropdownMenu';
import { Skeleton } from '~/components/ui/Skeleton';
import { useAuth } from '~/hooks/use-auth';

const Header = () => {
  const { signIn, signOut, status, session } = useAuth();
  return (
    <header className='container mx-auto flex items-center justify-between border-b py-2'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <h1 className='font-heading md:text-xl'>
            wise<span className='text-blue-400'>tip</span>
          </h1>
        </Link>
      </div>

      {status === 'unauthenticated' ? (
        <Button size='sm' onClick={() => void signIn()}>
          Sign In
        </Button>
      ) : status === 'authenticated' ? (
        session?.user.image &&
        session.user.name && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session?.user.image} alt={session?.user.name} />
                <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className='flex cursor-pointer items-center justify-between'
                onClick={() => void signOut()}
              >
                Logout <LogOut className='h-4 w-4' />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <Skeleton className='h-10 w-10 rounded-full bg-slate-200' />
      )}
    </header>
  );
};

export default Header;
