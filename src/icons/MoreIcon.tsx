import { CustomClassType } from '@/types';

export const MoreIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={customClass}
  >
    <path
      d="M8 6C6.90076 6 6 6.90076 6 8C6 9.09924 6.90076 10 8 10C9.09924 10 10 9.09924 10 8C10 6.90076 9.09924 6 8 6Z"
      fill="currentColor"
    />
    <path
      d="M8 0C6.90076 0 6 0.900764 6 2C6 3.09924 6.90076 4 8 4C9.09924 4 10 3.09924 10 2C10 0.900764 9.09924 0 8 0Z"
      fill="currentColor"
    />
    <path
      d="M8 12C6.90076 12 6 12.9008 6 14C6 15.0992 6.90076 16 8 16C9.09924 16 10 15.0992 10 14C10 12.9008 9.09924 12 8 12Z"
      fill="currentColor"
    />
  </svg>
);
