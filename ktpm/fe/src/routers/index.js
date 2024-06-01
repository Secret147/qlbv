import AdminLayOut from '~/layouts/AdminLayOut/AdminLayOut';

import Admin from '~/pages/Admin/Admin';
import Appointment from '~/pages/Appointment/Appointment';
import Bill from '~/pages/Bill/Bill';
import Clinic from '~/pages/Clinic/Clinic';
import Doctor from '~/pages/Doctor/Doctor';
import FormOrder from '~/pages/FormOrder/FormOrder';
import Login from '~/pages/Login/Login';

import Patient from '~/pages/Patient/Patient';
import Record from '~/pages/Record/Record';
import Register from '~/pages/Register/Register';
import Supplies from '~/pages/Supplies';

const publicRoutes = [
    { path: '/', component: Login, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/formorder', component: FormOrder, layout: null },
    { path: '/supplies', component: Supplies, layout: AdminLayOut },
    { path: '/doctor', component: Doctor, layout: AdminLayOut },
    { path: '/patient', component: Patient, layout: AdminLayOut },
    { path: '/record', component: Record, layout: AdminLayOut },
    { path: '/appointment', component: Appointment, layout: AdminLayOut },
    { path: '/admin', component: Admin, layout: AdminLayOut },
    { path: '/clinic', component: Clinic, layout: AdminLayOut },
    { path: '/bill', component: Bill, layout: AdminLayOut },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
