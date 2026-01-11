import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [creds, setCreds] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(creds);
            navigate('/notes');
        } catch (err) {
            alert('Échec de la connexion. Vérifiez vos identifiants.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Bienvenue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            onChange={e => setCreds({ ...creds, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setCreds({ ...creds, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Se connecter</button>
                </form>
                <div className="auth-footer">
                    Pas de compte ? <Link to="/register">S'inscrire</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
