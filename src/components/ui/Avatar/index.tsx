import { AvatarProps as AvatarNextUIProps } from '@nextui-org/react';

// Components
import { Image } from '../Image';

// Constants
import { AVATAR_THUMBNAIL } from '@/constants';

export interface AvatarProps extends AvatarNextUIProps {
  size?: 'sm' | 'md' | 'lg';
  avatarContainerClass?: string;
  isCustomBordered?: boolean;
  isShowFallback?: boolean;
  width?: number;
  height?: number;
}

const SIZE_CLASSES = {
  sm: 'min-w-6 w-6 h-6',
  md: 'min-w-8 w-8 h-8',
  lg: 'min-w-12 w-12 h-12',
};

export const Avatar = ({
  color,
  isCustomBordered = false,
  avatarContainerClass = '',
  size = 'md',
  src = '',
  alt = '',
  width = 48,
  height = 48,
  isBordered = false,
  className,
}: AvatarProps) => {
  const sizeClass = SIZE_CLASSES[size];
  const borderClass = isBordered
    ? 'ring-offset-2 ring-1 ring-green'
    : 'ring-offset-0 ring-0';

  const customBorderedClass =
    isCustomBordered && 'ring-offset-0 ring-warning ring-opacity-25 ring-4';

  const backgroundClass = `bg-${color}`;

  const baseClass =
    `${sizeClass} ${backgroundClass} ${borderClass} ${customBorderedClass} ${avatarContainerClass}`.trim();

  return (
    <span
      data-testid="avatar-container"
      tabIndex={-1}
      className={`overflow-hidden outline-none rounded-full ring-offset-background dark:ring-offset-background-dark shrink-0 ${baseClass}`}
    >
      <Image
        width={width}
        height={height}
        src={src || AVATAR_THUMBNAIL}
        alt={alt}
        className={className}
        fallbackSrc={AVATAR_THUMBNAIL}
      />
    </span>
  );
};

Avatar.displayName = 'Avatar';
