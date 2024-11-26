// Types
import { DIRECTION, ROLE, UserLogged } from '@/types';

// Constants
import { API_ENDPOINT, PAGE_SIZE_DEFAULT, PRIVATE_ROUTES } from '@/constants';

// Actions
import { getNotifications } from '@/actions/notification';

// Components
import ActivityFeedList from './ActivityFeedList';

export interface ActivityFeedProps {
  page: number;
  userLogged: UserLogged | null;
}

const ActivityFeed = async ({ page, userLogged }: ActivityFeedProps) => {
  const { id: userId = '', role: roleModel } = userLogged || {};
  const { name: role = ROLE.NORMAL_USER } = roleModel || {};

  const searchParamsAPI = () => {
    const params = new URLSearchParams();
    params.set('populate[0]', 'senderId');
    params.set('pagination[page]', page.toString());
    params.set('pagination[pageSize]', PAGE_SIZE_DEFAULT.toString());
    params.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

    if (role === ROLE.NORMAL_USER || !role) {
      params.set('filters[senderId][id][$eq]', `${userId}`);
    }
    return params;
  };

  const { notifications, error, ...meta } = await getNotifications({
    searchParams: searchParamsAPI(),
    options: {
      next: {
        tags: [
          API_ENDPOINT.NOTIFICATIONS,
          `${PRIVATE_ROUTES.DASHBOARD}/${userId}`,
        ],
      },
    },
  });

  if (error) throw error;

  return (
    <ActivityFeedList
      userId={userId}
      notifications={notifications || []}
      pagination={meta.pagination && { ...meta.pagination, page: Number(page) }}
    />
  );
};

ActivityFeed.displayName = 'ActivityFeed';
export default ActivityFeed;
