import {
  AppointmentIcon,
  ChemistIcon,
  DashboardIcon,
  DoctorIcon,
  MedicineIcon,
  MessageIcon,
  SettingIcon,
  WalletIcon,
} from '@/icons';

// Router
import { PRIVATE_ROUTES } from './router';

export const NAVBAR_LINKS = [
  {
    name: 'Dashboard',
    href: PRIVATE_ROUTES.DASHBOARD,
    icon: DashboardIcon,
    isEnable: true,
  },
  {
    name: 'Appointments',
    href: PRIVATE_ROUTES.APPOINTMENTS,
    icon: AppointmentIcon,
    isEnable: true,
  },
  {
    name: 'Chemists',
    href: PRIVATE_ROUTES.CHEMISTS,
    icon: ChemistIcon,
    isEnable: true,
  },
  {
    name: 'Wallet',
    href: PRIVATE_ROUTES.WALLET,
    icon: WalletIcon,
    isEnable: true,
  },
  { name: 'Doctors', href: '#', icon: DoctorIcon },
  { name: 'Medicines', href: '#', icon: MedicineIcon },
];

export const SUPPORT_LINKS = [
  { name: 'Messages', href: '#', icon: MessageIcon },
  {
    name: 'Settings',
    href: '#',
    icon: SettingIcon,
  },
];
