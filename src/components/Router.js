import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserList from './UserList';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/user-list" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;