import Login from '../components/Login'
import MainApp from '../components/MainApp';
import NotFoundPage from '../components/NotFoundPage'

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/app/*",
    component: MainApp,
  },
  {
    path: "*",
    component: NotFoundPage,
  }
];

export default routes;
