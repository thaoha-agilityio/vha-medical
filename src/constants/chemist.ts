import { UserModel } from '@/types';

export const DEFAULT_CHEMIST_DATA: UserModel = {
  email: '',
  username: '',
  password: '',
  description: '',
  rating: 0,
  tasks: 0,
  reviews: 0,
  specialtyId: undefined,
  avatar: undefined,
  currentBalance: 1000,
};

export const CHEMISTS_SEARCH_PARAMS = ['specialtyId'] as const;
