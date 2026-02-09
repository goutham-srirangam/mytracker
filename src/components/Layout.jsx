import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0, background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    DebtTracker
                </h1>
                <nav>
                    {/* Future Nav Links could go here */}
                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Control Your Finances</span>
                </nav>
            </header>
            <main className="container" style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
                {children}
            </main>
            <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.5, fontSize: '0.8rem' }}>
                &copy; {new Date().getFullYear()} DebtTracker Pro
            </footer>
        </div>
    );
};

export default Layout;
