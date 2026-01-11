import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/auth/register', formData);
            alert('Compte créé ! Vous pouvez vous connecter.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Erreur lors de l’inscription');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Créer un compte</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom complet</label>
                        <input
                            type="text"
                            placeholder="Jean Dupont"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">S'inscrire</button>
                </form>
                <div className="auth-footer">
                    Déjà inscrit ? <Link to="/login">Se connecter</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
