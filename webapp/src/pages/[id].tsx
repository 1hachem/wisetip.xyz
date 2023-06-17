import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SubmitTipModal from '~/components/SubmitTipModal';
import Tip from '~/components/Tip';
import { Skeleton } from '~/components/ui/Skeleton';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/utils';
import { api } from '~/utils/api';

const ItemPage = () => {
  const router = useRouter();
  const itemQuery = api.item.getOne.useQuery(router.query.id as string);
  const total = { upvotes: 0, downvotes: 0 };
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  itemQuery.data?.tips.map((tip) => {
    total.upvotes += tip._count.upvotes;
    total.downvotes += tip._count.downvotes;
  });

  if (itemQuery.status !== 'success' && !itemQuery.data) {
    // won't happen since we're using `fallback: "blocking"`
    return (
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-12 w-1/2' />
        <Skeleton className='h-20 w-3/4' />

        <div className='w-full space-y-4'>
          {new Array(5).fill(1).map((_, idx) => (
            <div key={idx} className='flex items-center justify-between'>
              <Skeleton className='h-8 w-3/4' />
              <Skeleton className='h-6 w-12' />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <NextSeo title={itemQuery.data?.name} />
      <div className='flex flex-col gap-6'>
        <Link
          href='/'
          className='flex w-fit items-center gap-1 rounded-md border border-b-4 border-r-4 border-primary px-2 py-1 font-semibold transition-all hover:bg-muted'
        >
          <ArrowLeft className='h-3 w-3' />
          Back
        </Link>
        <div className='space-y-2'>
          <div>
            <h1 className='text-2xl md:text-5xl'>{itemQuery.data?.name}</h1>
            <p className='text-xs font-semibold text-[#19A7CE]'>
              {itemQuery.data?._count.tips} tips • {total.upvotes} total upvotes • {total.downvotes}{' '}
              total downvotes
            </p>
          </div>
          <p className='w-full text-sm text-muted-foreground md:w-3/4 md:text-base'>
            {itemQuery.data?.description}
          </p>
        </div>
        <motion.div
          layout
          className={cn('space-y-2 rounded-lg border border-b-4 border-r-4 border-primary p-4', {
            'pointer-events-none opacity-50': isLoading,
          })}
        >
          <AnimatePresence>
            {itemQuery.data?.tips.map((tip) => (
              <Tip
                text={tip.text}
                upvotes={tip.upvotes.length}
                downvotes={tip.downvotes.length}
                tipId={tip.id}
                key={tip.id}
                upvoted={!!tip.upvotes.find((upvote) => upvote.userId === session?.user.id)}
                downvoted={!!tip.downvotes.find((downvote) => downvote.userId === session?.user.id)}
                setIsLoading={setIsLoading}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        <SubmitTipModal name={itemQuery.data?.name} />
      </div>
    </>
  );
};

export default ItemPage;
