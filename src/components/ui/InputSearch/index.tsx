'use client';

import { ChangeEvent, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// Utils
import { cn } from '@/utils';

// Components
import { InputProps } from '@nextui-org/react';
import { Input } from '@/components/ui';
import { SearchIcon } from '@/icons';

export const InputSearch = ({
  placeholder = '',
  classNames,
  ...props
}: InputProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get('search')?.toString();

  // Update the URL with the debounced search term
  const updateSearchParams = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    const page = searchParams.get('page')?.toString();

    if (page) params.delete('page');

    if (search) {
      params.set('search', encodeURIComponent(search.trim()));
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      updateSearchParams(value);
    },
    [updateSearchParams],
  );

  // Handle clear input
  const handleClear = () => {
    updateSearchParams('');
  };

  return (
    <Input
      classNames={{
        ...classNames,
        mainWrapper: cn(
          'h-fit lg:max-w-[400px] text-xs',
          classNames?.mainWrapper,
        ),
        inputWrapper: 'h-[52px]',
      }}
      border="default"
      placeholder={placeholder}
      startContent={<SearchIcon customClass="w-5 h-5 ml-4 text-primary-200" />}
      isClearable
      onClear={handleClear}
      onChange={handleChangeInput}
      defaultValue={defaultValue}
      {...props}
    />
  );
};

InputSearch.displayName = 'InputSearch';
