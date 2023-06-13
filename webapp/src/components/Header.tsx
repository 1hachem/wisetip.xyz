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
    <header className='container mx-auto py-2 flex items-center justify-between border-b'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <h1 className='md:text-xl font-heading'>wisetip</h1>
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
                className='flex items-center justify-between cursor-pointer'
                onClick={() => void signOut()}
              >
                Logout <LogOut className='w-4 h-4' />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <Skeleton className='rounded-full h-10 w-10 bg-slate-200' />
      )}
    </header>
  );
};

export default Header;
