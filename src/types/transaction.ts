import {
  APIRelatedResponse,
  APIResponse,
  MetaResponse,
  UserModel,
} from '@/types';

export interface TransactionModel {
  amount: number;
  senderId: APIRelatedResponse<APIResponse<UserModel>>;
  receiverId: APIRelatedResponse<APIResponse<UserModel>>;
  createdAt?: string;
}

export type TransactionResponse = APIResponse<TransactionModel>;

export type TransactionDataResponse = {
  transaction: TransactionResponse | null;
  error: string | null;
};

export type TransactionsDataResponse = Promise<
  { transactions: TransactionResponse[]; error: string | null } & MetaResponse
>;

export type TransactionsResponse = {
  data: TransactionResponse[];
  meta: MetaResponse;
};

export type TransactionPayload = Partial<
  Omit<TransactionModel, 'senderId' | 'receiverId'>
> & {
  senderId?: string;
  receiverId?: string;
};
