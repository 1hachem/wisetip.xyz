import { Coins, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import PricingPackage from '~/components/PricingPackage';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/Avatar';
import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/DropdownMenu';
import { Skeleton } from '~/components/ui/Skeleton';
import { useAuth } from '~/hooks/use-auth';
import { useToast } from '~/hooks/use-toast';
import { api } from '~/utils/api';

const Header = () => {
  const { signIn, signOut, status, session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { toast } = useToast();
  const { mutate } = api.utils.addInterested.useMutation();
  return (
    <div className='sticky top-0 z-50 bg-white'>
      <header className='container mx-auto flex items-center justify-between border-b py-4'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <h1 className='font-heading text-xl'>
              wise<span className='text-[#19A7CE]'>tip</span>
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
            <div className='flex items-center gap-4'>
              <div className='hidden items-center gap-2 md:flex'>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <Button
                    className='flex items-center gap-2 bg-[#19A7CE]'
                    onClick={() => setIsOpen(true)}
                  >
                    <Coins className='h-4 w-4' />
                    Buy new coins
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Buy additional coins</DialogTitle>
                      <DialogDescription>
                        Unlock the full potential of wisetip with our exclusive coin packages! Every
                        purchase is a one-time payment that instantly credits your account. Get
                        started by buying a few coins, or take advantage of our bulk options and
                        save an incredible 50% off! Embrace the power of our tools while enjoying
                        great savings. Invest in your digital journey today!
                      </DialogDescription>
                    </DialogHeader>
                    <div className='my-4 flex flex-col gap-4'>
                      <PricingPackage
                        idx={0}
                        setSelected={setSelected}
                        selected={selected === 0}
                        price='x coins for $x.xx'
                      />
                      <PricingPackage
                        idx={1}
                        setSelected={setSelected}
                        selected={selected === 1}
                        price='x coins for $x.xx'
                      />
                      <PricingPackage
                        idx={2}
                        setSelected={setSelected}
                        selected={selected === 2}
                        price='x coins for $x.xx'
                      />
                    </div>
                    <Button
                      onClick={() => {
                        toast({
                          title: 'Coming soon!',
                          description:
                            'Stay tuned for the ability to purchase coins and unlock enhanced features. 🚀',
                        });
                        mutate(session.user.id);
                      }}
                    >
                      Buy Coins
                    </Button>
                  </DialogContent>
                </Dialog>
                <p className='text-sm font-bold text-muted-foreground'>
                  {session.user.coins} Coins left
                </p>
              </div>
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
            </div>
          )
        ) : (
          <Skeleton className='h-10 w-10 rounded-full bg-slate-200' />
        )}
      </header>
    </div>
  );
};

export default Header;
