//Layouts
import { HeaderOnly } from '~/layouts';

//Pages
import Home from '~/components/pages/Home';
import Following from '~/components/pages/Following';
import Profile from '~/components/pages/Profile';
import Upload from '~/components/pages/Upload';
import Search from '~/components/pages/Search';
import Live from '~/components/pages/Live';

import TableUsers from '~/components/pages/TableUsers/TableUsers';
import TableVideos from '~/components/pages/TableVideos/TableVideos';

import config from '~/config';
import Login from '~/components/pages/Login';

import register from '~/components/pages/Register';
import UploadDetail from '~/components/pages/Upload/component/UploadDetail/UploadDetail';
import GPT from '~/components/pages/Gpt';
import ApiChecker from '~/components/pages/ApiChecker';
import VideoCall from '~/components/pages/VideoCall';

//Pulic routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload },
    { path: config.routes.uploaddetail, component: UploadDetail },

    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.live, component: Live },

    { path: config.routes.login, component: Login, layout: HeaderOnly },

    { path: config.routes.register, component: register, layout: HeaderOnly },
    { path: config.routes.foryou, component: Home },
    { path: config.routes.check, component: ApiChecker },
    { path: config.routes.call, component: VideoCall }
];

const privateRoutes = [
    { path: config.routes.managerUser, component: TableUsers },
    { path: config.routes.managerVideo, component: TableVideos },
    { path: config.routes.gpt, component: GPT }
];

export { publicRoutes, privateRoutes };
