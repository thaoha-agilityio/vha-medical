'use client';

import { Controller, useForm } from 'react-hook-form';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// Components
import { Button, Input, Select, Text } from '@/components/ui';

// Types
import { STATUS_TYPE, TransactionPayload, UserLogged } from '@/types';

// Services
import {
  addTransaction,
  getUser,
  getUsers,
  receiveMoney,
  sendMoney,
} from '@/services';

// Utils
import { clearErrorOnChange, transformUsers } from '@/utils';

// Constants
import {
  ERROR_MESSAGE,
  FORM_VALIDATION_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/constants';
import { useToast } from '@/context/toast';

const selectCustomStyle = {
  mainWrapper: 'h-16',
  trigger: 'h-[auto] py-3 max-h-10',
  errorMessage: 'text-danger text-xs ml-2',
  label: 'top-5 text-sm',
  value: 'text-sm text-primary-100',
};

interface TransactionFormProps {
  userLogged: UserLogged | null;
  onClose: () => void;
}

export const TransactionForm = ({
  onClose,
  userLogged,
}: TransactionFormProps) => {
  const { id: userId = '', currentBalance = 0 } = userLogged || {};
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isLoading, isDirty },
    trigger,
  } = useForm<TransactionPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      senderId: userId.toString(),
    },
  });
  const [users, setUsers] = useState<UserLogged[]>([]);
  const [isPending, setIsPending] = useState(false);
  const openToast = useToast();

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
    RECEIVER_ID: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The receiver'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== userId.toString() ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    },
    AMOUNT: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Amount'),
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGE.AMOUNT_GREATER_THAN_0,
      },
      max: {
        value: currentBalance,
        message: FORM_VALIDATION_MESSAGE.AMOUNT_GREATER_THAN_BALANCE,
      },
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

  const onSubmit = async (data: TransactionPayload) => {
    setIsPending(true);

    const formData = {
      ...data,
      senderId: userId,
    };
    const { user: receiver } = await getUser(data.receiverId);
    const { currentBalance: currentBalanceOfReceive = 0 } = receiver || {};

    const money = Number(data.amount);
    const moneySender = currentBalance - money;
    const moneyReceive = currentBalanceOfReceive + money;

    const { error } = await addTransaction(formData);

    if (error) {
      openToast({
        message: ERROR_MESSAGE.CREATE('transaction', error),
        type: STATUS_TYPE.ERROR,
      });
      setIsPending(false);

      return;
    }

    openToast({
      message: SUCCESS_MESSAGE.CREATE('transaction'),
      type: STATUS_TYPE.SUCCESS,
    });

    setIsPending(false);
    onClose();

    await sendMoney(userId, moneySender);
    await receiveMoney(data.receiverId, moneyReceive);
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
            rules={TRANSACTION_FORM_VALIDATION.AMOUNT}
            render={({
              field: { name, onChange, value, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                isRequired
                label="Amount"
                labelPlacement="outside"
                name={name}
                type="number"
                size="sm"
                isDisabled={isLoading || isPending}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={handleInputChange(name, onChange)}
                placeholder="0.00"
                value={value?.toString() || ''}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-sm">$</span>
                  </div>
                }
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
            isDisabled={!isValid || !isDirty || isPending}
            isLoading={isLoading || isPending}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </section>
    </form>
  );
};
