import { CheckCircle } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import { Button } from '~/components/ui/Button';
import { cn } from '~/utils';

interface PricingPackageProps {
  price: string;
  selected?: boolean;
  setSelected: Dispatch<SetStateAction<number>>;
  idx: number;
}

const PricingPackage = ({ price, selected, setSelected, idx }: PricingPackageProps) => {
  return (
    <Button
      variant='outline'
      disabled
      className={cn('justify-between opacity-50', {
        'border-[#19A7CE] bg-[#19A7CE] text-white': selected,
      })}
      onClick={() => setSelected(idx)}
    >
      <span>{price}</span>
      {selected && <CheckCircle className='h-4 w-4' />}
    </Button>
  );
};

export default PricingPackage;
