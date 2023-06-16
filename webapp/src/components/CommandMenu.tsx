import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '~/components/ui/Button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/Command';
import { useAuth } from '~/hooks/use-auth';
import { useDebounce } from '~/hooks/use-debounce';
import { cn } from '~/utils';
import { api } from '~/utils/api';

export function CommandMenu() {
  const items = api.item.getAll.useQuery();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);
  const results = api.item.search.useQuery({ text: debouncedValue });
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { status } = useAuth();

  const handleChange = (search: string) => {
    setValue(search);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        className={cn(
          'relative h-12 w-full justify-center text-sm text-primary-foreground md:w-1/4',
        )}
        onClick={() => {
          setOpen(true);
        }}
        disabled={status === 'loading'}
      >
        <Search className='mr-2 h-4 w-4' />
        <span>Search for anything</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          value={value}
          onValueChange={handleChange}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {debouncedValue === '' && items.data && items.data.length > 0 && (
            <CommandGroup heading='items'>
              {items.data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    runCommand(() => router.push(item.id));
                  }}
                  className='cursor-pointer'
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results.data && results.data?.results.length > 0 && (
            <CommandGroup heading='results'>
              {results.data.results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.name}
                  onSelect={() => {
                    runCommand(() => router.push(result.id));
                  }}
                  className='cursor-pointer'
                >
                  {result.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
