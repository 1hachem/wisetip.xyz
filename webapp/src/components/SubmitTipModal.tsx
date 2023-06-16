import { useRouter } from 'next/router';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/Dialog';
import { Button } from '~/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import { api } from '~/utils/api';
import { useAuth } from '~/hooks/use-auth';
import { useToast } from '~/hooks/use-toast';

interface SubmitTipModalProps {
  name?: string;
}

const formSchema = z.object({
  tip: z.string().min(1, 'Make sure to fill your tip'),
});

const SubmitTipModal = ({ name }: SubmitTipModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = api.item.submitTip.useMutation();
  const { session } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tip: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>,
  ) => {
    setIsLoading(true);
    try {
      await mutateAsync({
        tip: values.tip,
        userId: session?.user.id as string,
        itemId: router.query.id as string,
      });
      toast({
        title: 'Tip Submitted Successfully',
        description: 'Your tip has been submitted and will be reviewed by the team 🧐',
      });
      setIsOpen(false);
    } catch {
      toast({
        title: 'Ooops! Something went wrong',
        description: 'Something went wrong on our end, Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={() => setIsOpen(true)} className='mx-auto w-full bg-[#19A7CE] md:w-1/2'>
        Add new Tips for <span className='ml-1 font-semibold'>{name}</span>
        <Plus className='ml-2 h-4 w-4' />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit your tips</DialogTitle>
          <DialogDescription>
            You can submit your own tips to be added to the list of tips for the item{' '}
            <span className='font-semibold'>{name}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='tip'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your tip</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder='Input your tip in here' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitTipModal;
