import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { initSocket, disconnectSocket } from '../services/socket';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    authService.getMe().then(res => {
                        setUser(res.data.data);
                        initSocket(token);
                    });
                }
            } catch (e) { localStorage.removeItem('token'); }
        }
        setLoading(false);
    }, []);

    const login = async (creds) => {
        const res = await authService.login(creds);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        initSocket(res.data.token);
    };

    const logout = () => { setUser(null); localStorage.removeItem('token'); disconnectSocket(); };

    return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};
