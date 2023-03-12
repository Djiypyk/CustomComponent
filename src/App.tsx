import { Route, Routes } from 'react-router-dom';
import { PATH } from './constant';

import { Main, Layout, Page404, Loaders } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route index element={<Main />} />
                <Route path={PATH.LOADERS} element={<Loaders />} />
                <Route path={'*'} element={<Page404 />} />
            </Route>
        </Routes>
    );
};

export default App;
