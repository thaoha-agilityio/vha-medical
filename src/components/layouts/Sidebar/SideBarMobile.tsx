'use client';

import {
  cn,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';

// Services
import { logout } from '@/services';

// Components
import { Button, Image, Navbar } from '@/components/ui';
import { ArrowRightIcon, LogoutIcon } from '@/icons';

// Constants
import { AUTH_ROUTES, PRIVATE_ROUTES, SRC_LOGO } from '@/constants';
import Link from 'next/link';

export const SidebarMobile = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onLogout = async () => {
    await logout();
    location.replace(AUTH_ROUTES.LOGIN);
  };

  return (
    <aside>
      <div className="flex absolute left-0">
        <Button
          className="p-0 min-w-4 h-7 bg-linear-success rounded-none rounded-r-lg lg:hidden"
          onClick={onOpen}
          data-testid="open-sidebar-mobile"
          aria-label="open sidebar"
        >
          <ArrowRightIcon customClass="w-4 h-4" />
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={cn(
          {
            'animate-slideInLeft': isOpen,
            'animate-slideInRight': !isOpen,
          },
          'm-0 sm:m-0 rounded-none max-w-[277px] lg:hidden',
        )}
        classNames={{
          base: 'absolute top-0 left-0',
          closeButton:
            'p-0 min-w-4 h-7 bg-linear-success rounded-none rounded-l-lg text-content1 top-2 right-0',
          backdrop: 'lg:hidden z-[40]',
        }}
        closeButton={
          <Button onClick={onClose} aria-label="close sidebar">
            <ArrowRightIcon customClass="w-4 h-4 rotate-180" />
          </Button>
        }
      >
        <ModalContent>
          <ModalBody className="min-h-screen p-0 bg-background-200">
            <h1 className="m-auto py-5">
              <Link href={PRIVATE_ROUTES.DASHBOARD}>
                <Image
                  src={SRC_LOGO}
                  alt="logo"
                  width={40}
                  height={40}
                  placeholder="empty"
                  className="w-full h-auto"
                />
              </Link>
            </h1>
            <div className="flex-1">
              <Navbar isExpandSidebar />
            </div>
            <div className="pl-3 py-5">
              <Button
                color="stone"
                startContent={<LogoutIcon />}
                className="gap-3"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </aside>
  );
};
