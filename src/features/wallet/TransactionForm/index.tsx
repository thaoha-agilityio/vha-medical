'use client';

import { Controller, useForm } from 'react-hook-form';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// Components
import { Button, Input, Select, Text } from '@/components/ui';

// Types
import { TransactionPayload, UserLogged } from '@/types';

// Services
import { getUsers } from '@/services';

// Utils
import { clearErrorOnChange, transformUsers } from '@/utils';

// Constants
import { FORM_VALIDATION_MESSAGE } from '@/constants';

const selectCustomStyle = {
  mainWrapper: 'h-16',
  trigger: 'h-[auto] py-3 max-h-10',
  errorMessage: 'text-danger text-xs ml-2',
  label: 'top-5 text-sm',
  value: 'text-sm text-primary-100',
};

interface TransactionFormProps {
  onClose: () => void;
}

export const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors, isValid, isLoading, isDirty },
    trigger,
  } = useForm<TransactionPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const [users, setUsers] = useState<UserLogged[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, error } = await getUsers();
      if (error) throw error;
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const OPTION_USERS = transformUsers(users);

  const handleCloseSelect = (field: keyof TransactionPayload) => () => {
    trigger(field);
  };

  const TRANSACTION_FORM_VALIDATION = {
    SENDER_ID: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The sender'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== getValues('receiverId') ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    },
    RECEIVER_ID: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The receiver'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== getValues('senderId') ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    },
    AMOUNT: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Amount'),
    },
  };

  const handleInputChange = useCallback(
    (name: keyof TransactionPayload, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        // Clear error message on change
        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const onSubmit = (data: TransactionPayload) => {
    data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <Text variant="title" size="xl">
          Create transaction
        </Text>

        <div className="mt-10">
          <Controller
            control={control}
            name="senderId"
            rules={TRANSACTION_FORM_VALIDATION.SENDER_ID}
            render={({
              field: { name, value, onChange, onBlur: _onBlur, ...rest },
              fieldState: { error },
            }) => (
              <Select
                {...rest}
                name={name}
                value={value}
                label="Sender"
                placeholder="Select sender"
                labelPlacement="outside"
                variant="bordered"
                classNames={selectCustomStyle}
                options={OPTION_USERS}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={onChange}
                onClose={handleCloseSelect(name)}
              />
            )}
          />

          <Controller
            control={control}
            name="receiverId"
            rules={TRANSACTION_FORM_VALIDATION.RECEIVER_ID}
            render={({
              field: { name, value, onChange, onBlur: _onBlur, ...rest },
              fieldState: { error },
            }) => (
              <Select
                {...rest}
                name={name}
                value={value}
                label="Receiver"
                placeholder="Select receiver"
                labelPlacement="outside"
                variant="bordered"
                aria-label="Receiver"
                classNames={selectCustomStyle}
                options={OPTION_USERS}
                isInvalid={!!error?.message}
                isDisabled={!users.length}
                errorMessage={error?.message}
                onChange={onChange}
                onClose={handleCloseSelect(name)}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                isRequired
                label="Amount"
                labelPlacement="outside"
                name={name}
                placeholder="Please enter amount"
                type="number"
                size="sm"
                isDisabled={isLoading}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={handleInputChange(name, onChange)}
              />
            )}
          />
        </div>

        <div className="w-full gap-2 flex justify-end">
          <Button
            variant="outline"
            color="outline"
            className="font-medium"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            isDisabled={!isValid || !isDirty}
            isLoading={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </section>
    </form>
  );
};
