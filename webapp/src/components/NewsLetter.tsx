import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import { useToast } from '~/hooks/use-toast';
import { api } from '~/utils/api';

const NewsLetter = () => {
  const [mail, setMail] = useState('');
  const { toast } = useToast();

  const { isLoading, mutateAsync } = api.utils.addMail.useMutation();
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
    <div className='mx-auto flex flex-col items-center gap-4 rounded-lg border border-primary bg-white p-4 md:w-2/3'>
      <h2 className='text-center font-sans text-lg font-bold md:text-3xl'>
        Join our newsletter to stay updated about latest features and changes.
      </h2>
      <div className='w-full md:w-2/3'>
        <Label htmlFor='waitlist' className='text-sm text-primary'>
          Email
        </Label>
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1'>
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
            <p className='text-xs text-slate-400'>
              Don&apos;t worry, we won&apos;t be spamming you. 👀
            </p>
          </div>
          <Button onClick={sendRequest} disabled={mail === '' || isLoading}>
            <Send className='mr-2 h-4 w-4' />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
