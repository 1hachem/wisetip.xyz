import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '~/utils';
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
import { api } from '~/utils/api';
import { useDebounce } from '~/hooks/use-debounce';

export function CommandMenu() {
  const items = api.item.getAll.useQuery();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const handleChange = (search: string) => {
    setValue(search);
  };
  const results = api.item.search.useQuery({ text: debouncedValue });
  const router = useRouter();
  const [open, setOpen] = useState(false);
  console.info(results.status);

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
        variant='outline'
        className={cn(
          'relative h-9 w-3/5 justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12',
        )}
        onClick={() => setOpen(true)}
      >
        <span className='hidden lg:inline-flex'>Search for items...</span>
        <span className='inline-flex lg:hidden'>Search...</span>
        <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
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
