// Packages
import { ElementType, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

// Services
import { routeUtilService } from '../services/routes';

// Types
import { AppRouterProps } from '../services/routes/types';

export const AppRoutes = () => {
  /**
   *
   * @Methods
   */
  const renderRoutes = (routes: AppRouterProps[]) => {
    if (!routes?.length) return <></>;
    return routes.map((route: AppRouterProps) => {
      const Component = route.component as ElementType;

      return (
        <Route key={route.key} index={route.index} {...(!route.index ? { path: route.path } : {})} element={<Component />}>
          {renderRoutes(route.childrenRoutes as AppRouterProps[])}
        </Route>
      );
    });
  };

  /**
   * @Variables
   */
  const appRoutes = useMemo(() => {
    return <Routes>{renderRoutes(routeUtilService.applicationRoutes)}</Routes>;
  }, []);

  /**
   * @Render
   */
  return <>{appRoutes}</>;
};
