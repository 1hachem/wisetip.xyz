import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/Avatar';
import { Button } from '~/components/ui/Button';
import { useAuth } from '~/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { CommandMenu } from './CommandMenu';

const Header = () => {
  const { signIn, signOut, status, session } = useAuth();
  return (
    <header className='py-2 flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <h1 className='font-bold md:text-xl'>wisetip</h1>
        </Link>
      </div>
      <CommandMenu />

      {status === 'unauthenticated' ? (
        <Button variant='outline' size='sm' onClick={() => void signIn()}>
          Sign In
        </Button>
      ) : (
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
      )}
    </header>
  );
};

export default Header;
