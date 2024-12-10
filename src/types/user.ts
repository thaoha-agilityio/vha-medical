import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  MetaResponse,
  NotificationModel,
  SpecialtyModel,
  TransactionModel,
} from '@/types';

// Role
export const enum ROLE {
  ADMIN = 'Admin',
  NORMAL_USER = 'Normal User',
}

export type RoleModel = {
  name: ROLE;
};

// User
export interface UserModel {
  id?: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  description?: string;
  rating?: number;
  tasks?: number;
  reviews?: number;
  specialtyId?: APIRelatedResponse<APIResponse<SpecialtyModel>>;
  notificationsSent?: APIRelatedResponse<APIResponse<NotificationModel>[]>;
  appointmentSent?: APIRelatedResponse<APIResponse<AppointmentModel>[]>;
  appointmentReceived?: APIRelatedResponse<APIResponse<AppointmentModel>[]>;
  transactionSent?: APIRelatedResponse<APIResponse<TransactionModel>[]>;
  transactionReceived?: APIRelatedResponse<APIResponse<TransactionModel>[]>;
  currentBalance?: number;
  currentSpending?: number;
}

export type UserLogged = Omit<
  UserModel,
  | 'avatar'
  | 'role'
  | 'specialtyId'
  | 'notificationsSent'
  | 'appointmentSent'
  | 'appointmentReceived'
  | 'transactionSent'
  | 'transactionReceived'
> & {
  id: string;
  avatar?: string;
  role: RoleModel;
  specialtyId?: SpecialtyModel;
  notificationsSent?: NotificationModel[];
  appointmentSent?: AppointmentModel[];
  appointmentReceived?: AppointmentModel[];
  transactionSent?: TransactionModel[];
  transactionReceived?: TransactionModel[];
};

export type UserSession = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  token: string;
  remember: boolean;
};

export type UserResponse = APIResponse<UserModel>;

export type UsersDataResponse = Promise<
  { users: UserResponse[]; error?: Error } & MetaResponse
>;

export type UsersResponse = {
  data: UserResponse[];
  meta: MetaResponse;
};

export type UserPayload = Omit<
  UserModel,
  | 'id'
  | 'avatar'
  | 'role'
  | 'notificationsSent'
  | 'appointmentSent'
  | 'appointmentReceived'
  | 'specialtyId'
  | 'transactionSent'
  | 'transactionReceived'
> & {
  role: number;
  password?: string;
  specialtyId?: number | null;
  avatar?: string;
  currentBalance?: number | null;
};
