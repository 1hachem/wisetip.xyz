import { DefaultSeo } from 'next-seo';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { useState, type MetaHTMLAttributes, type ReactNode } from 'react';

import { MessageSquarePlus } from 'lucide-react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { Button } from '~/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/Popover';
import { Textarea } from '~/components/ui/TextArea';
import { useAuth } from '~/hooks/use-auth';
import { useToast } from '~/hooks/use-toast';
import { cn } from '~/utils';
import { api } from '~/utils/api';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

interface LayoutProps extends MetaHTMLAttributes<HTMLMetaElement> {
  children: ReactNode;
}

const Layout = ({ children, ...customMeta }: LayoutProps) => {
  const meta = {
    title: 'Tips at your finger tips',
    description: 'Find the best tips in the tip of your finger.',
    ...customMeta,
  };

  const [feedback, setFeedback] = useState('');

  const { status, session } = useAuth();
  const { mutateAsync, isLoading } = api.utils.addFeedback.useMutation();
  const { toast } = useToast();

  return (
    <>
      <DefaultSeo
        titleTemplate='Wisetip.xyz - %s'
        title={meta.title}
        description={meta.description}
      />
      <div
        className={cn(
          'flex min-h-screen w-screen flex-col justify-between gap-4 font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <Header />
        <main className='container mx-auto flex-1'>{children}</main>
        <Footer />
        {status === 'authenticated' && (
          <Popover>
            {/* <Button onClick={() => setIsOpen(true)} className='fixed bottom-8 right-8'>
              <MessageSquarePlus className='h-4 w-4' />
            </Button> */}
            <PopoverTrigger className='fixed bottom-8 left-8 z-40 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90'>
              <MessageSquarePlus className='h-6 w-6' />
            </PopoverTrigger>

            <PopoverContent className='w-96 space-y-2'>
              <div>
                <h2 className='text-xl font-bold'>Help us improve</h2>
                <p className='text-sm text-muted-foreground'>
                  Share your thoughts, suggestions, or any issues you encountered with our app:
                </p>
              </div>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className='max-h-24'
                placeholder='Enter your wildest ideas here'
              />
              <Button
                disabled={feedback === '' || isLoading}
                onClick={() => {
                  mutateAsync({ feedback, userId: session?.user.id as string })
                    .then(() => {
                      toast({
                        title: 'Feedback Sent: Mission Accomplished!',
                        description:
                          "Thanks for your feedback! We've received it and will use it to enhance your app experience. Stay tuned for exciting updates!",
                      });
                    })
                    .catch(() => {
                      toast({
                        title: 'Error Sending Feedback',
                        description:
                          'Oops! Something went wrong while sending your feedback. Please try again later. We apologize for any inconvenience caused.',
                      });
                    });
                }}
              >
                Send feedback
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
};

export default Layout;
