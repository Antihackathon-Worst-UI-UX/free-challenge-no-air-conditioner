import { Routes, Route } from 'react-router-dom';
import Supermarket from './Supermarket';

function Router() {
    return (
        <Routes>
            <Route path="/supermarket" element={<Supermarket />} />
          </Routes>
    );
}

export default Router;