
import Admin from './pages/store/Admin';
import Auth from './pages/store/Auth';
import Basket from './pages/store/Basket';
import DevicePage from './pages/store/DevicePage';
import Shop from './pages/store/Shop';
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts';

export const authRoutes = [

    {
        path: ADMIN_ROUTE,
        element: Admin
    },

    {
        path: BASKET_ROUTE,
        element: Basket
    }
]


export const publicRoutes = [

    {
        path: SHOP_ROUTE,
        element: Shop
    },
    {
        path: LOGIN_ROUTE,
        element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        element: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        element: DevicePage
    }

]

    


