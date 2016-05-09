import LoginComponent from './endpoints/login/login';
import AdminComponent from './endpoints/admin/admin';
import TestComponent from './endpoints/test/test';

export const router = {
    config: [
        {path: '/', name: 'Login', component: LoginComponent},
        {path: '/test', name: 'Test', component: TestComponent},
        {path: '/stats', name: 'Admin', component: AdminComponent},
    ]
};
