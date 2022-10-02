// Components
import { UpsertVideo, Videos } from '../../pages/video';

// Services
import { routeConstantsService } from './constants';
import { AppRouterProps } from './types';

export const routeUtilService = (() => {
  /**
   * NOTE: All un-authenticated routes will be listed down here.
   */
  const unAuthenticatedRoutes: AppRouterProps[] = [
    {
      ...routeConstantsService.unAuthenticatedRoutes.videos,
      component: Videos,
    },
    { ...routeConstantsService.unAuthenticatedRoutes.createVideo, component: UpsertVideo },
    { ...routeConstantsService.unAuthenticatedRoutes.editVideo, component: UpsertVideo },
  ];

  /**
   * NOTE: All authenticated routes will be listed down here,
   * it's just an empty array for now because we currently don't have any protected routes.
   */
  //   const authenticatedRoutes: AppRouterProps[] = [];

  // merged route Arrays for all routes if we want to add authenticated routes
  // const applicationRoutes: AppRouterProps[] = [...unAuthenticatedRoutes, ...authenticatedRoutes];

  const applicationRoutes: AppRouterProps[] = [...unAuthenticatedRoutes];

  /**
   * @Public_Methods
   */
  return {
    applicationRoutes,
  };
})();
