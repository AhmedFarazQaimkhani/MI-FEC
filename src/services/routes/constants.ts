// Types
import { AppRouterProps } from './types';

export const routeConstantsService = (() => {
  /**
   * NOTE: Declare all routes which doesn't require authentication over here.
   */
  const unAuthenticatedRoutes: Record<string, AppRouterProps> = {
    videos: {
      key: 'videos',
      title: 'Videos',
      path: '/',
    },
    createVideo: {
      key: 'createVideo',
      title: 'Create Video',
      path: '/create-video',
    },
    editVideo: {
      key: 'editVideo',
      title: 'Edit Video',
      path: '/edit-video/:id',
    },
  };

  /**
   * NOTE: Declare all routes which require authentication over here.
   */
  //   const authenticatedRoutes: Record<string, AppRouterProps> = {
  /**
   * NOTE: protected routes will have "isProtected" as true,
   * we don't have any protected routes for now.
   * This is just an example of how those routes will work.
   */
  // protected: {
  //   key: 'home',
  //   title: 'Home',
  //   path: '/',
  //   isProtected: true,
  // },
  //   };

  /**
   * @Public_Methods
   */
  return {
    // authenticatedRoutes,
    unAuthenticatedRoutes,
  };
})();
