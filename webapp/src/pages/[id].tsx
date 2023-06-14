import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import Tip from '~/components/Tip';
import { Skeleton } from '~/components/ui/Skeleton';
import { api } from '~/utils/api';

const ItemPage = () => {
  const router = useRouter();
  const itemQuery = api.item.getOne.useQuery(router.query.id as string);
  const numberOfTips = itemQuery.data?.tips.length;
  let totalUpvotes = 0;
  itemQuery.data?.tips.map((tip) => (totalUpvotes += tip.upvotes));
  if (itemQuery.status !== 'success' && !itemQuery.data) {
    // won't happen since we're using `fallback: "blocking"`
    return (
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-12 w-1/2' />
        <Skeleton className='h-20 w-3/4' />

        <div className='space-y-4 w-full'>
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
    <div className='flex flex-col gap-6'>
      <div className='space-y-2'>
        <div>
          <h1 className='font-heading text-2xl md:text-5xl'>{itemQuery.data?.name}</h1>
          <p className='text-xs text-muted-foreground font-semibold'>
            {numberOfTips} tips • {totalUpvotes} total upvotes
          </p>
        </div>
        <p className='text-muted-foreground w-full md:w-3/4 text-sm md:text-base'>
          {itemQuery.data?.description}
        </p>
      </div>
      <motion.div
        layout
        className='space-y-2 border border-r-4 border-b-4 border-primary rounded-lg p-4'
      >
        <AnimatePresence>
          {itemQuery.data?.tips.map((tip) => (
            <Tip text={tip.text} upvotes={tip.upvotes} key={tip.id} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ItemPage;
