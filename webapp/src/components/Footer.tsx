import { useState } from 'react';
import Link from 'next/link';

import { Label } from '~/components/ui/Label';
import { Input } from '~/components/ui/Input';
import { Button } from '~/components/ui/Button';
import { Separator } from '~/components/ui/Separator';
import { api } from '~/utils/api';
import { useToast } from '~/hooks/use-toast';

const Footer = () => {
  const [mail, setMail] = useState('');
  const { toast } = useToast();

  const { isLoading, mutateAsync } = api.mail.add.useMutation();
  const sendRequest = () => {
    mutateAsync(mail)
      .then(() => {
        toast({
          title: "Hooray!! You're now signed up.",
          description:
            "You're now on the waitlist and we will inform you as soon as we launch :)any",
        });
      })
      .catch(() => {
        toast({
          title: 'Ooops!! You already signed up.',
          description:
            "We know you can't wait to start using wisetip, but we are still working on it. 🚀",
        });
      });
  };

  return (
    <footer className='flex flex-col items-center gap-4 border border-t bg-[#E3F4F4] py-4'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row'>
        <Link href='/about-us' className='underline'>
          About Us
        </Link>
        <div className='flex w-full flex-col gap-1 md:w-2/5'>
          <Label htmlFor='waitlist' className='text-sm text-primary'>
            Request a demo
          </Label>
          <div className='flex gap-2'>
            <Input
              name='waitlist'
              required
              placeholder='john@doe.com'
              type='email'
              autoComplete='off'
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className='border-primary'
            />
            <Button onClick={sendRequest} disabled={mail === '' || isLoading}>
              Request
            </Button>
          </div>
          <p className='text-xs text-slate-400'>As soon as we launch you will be notified</p>
        </div>
      </div>
      <Separator className='container mx-auto' />
      <p className='text-sm text-slate-600'>© 2023, Wisetip. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
