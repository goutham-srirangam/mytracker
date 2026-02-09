import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === '0103') {
            onLogin();
        } else {
            setError(true);
            setCode('');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)',
            color: 'white'
        }}>
            <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '2rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Restricted Access
                </h1>
                <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Enter the access code to view this application.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter Access Code"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); setError(false); }}
                        style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px' }}
                        autoFocus
                    />
                    {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>Incorrect Access Code via Password</div>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
