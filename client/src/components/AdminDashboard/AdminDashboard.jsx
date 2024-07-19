import React, { useEffect, useState } from 'react';
import { getTokens, createToken, updateToken, deleteToken } from '../../services/api';


const AdminDashboard = () => {
    const [tokens, setTokens] = useState([]);
    const [newToken, setNewToken] = useState({ name: '', description: '', latitude: '', longitude: '' });
    const [editToken, setEditToken] = useState(null);

    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = async () => {
        try {
            const data = await getTokens();
            setTokens(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const handleCreateToken = async (e) => {
        e.preventDefault();
        try {
            await createToken(newToken);
            setNewToken({ name: '', description: '', latitude: '', longitude: '' });
            fetchTokens();
        } catch (error) {
            console.error('Error creating token:', error);
        }
    };

    const handleEditToken = (token) => {
        setEditToken(token);
    };

    const handleUpdateToken = async (e) => {
        e.preventDefault();
        try {
            await updateToken(editToken._id, editToken);
            setEditToken(null);
            fetchTokens();
        } catch (error) {
            console.error('Error updating token:', error);
        }
    };

    const handleDeleteToken = async (id) => {
        try {
            await deleteToken(id);
            fetchTokens();
        } catch (error) {
            console.error('Error deleting token:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <form onSubmit={handleCreateToken}>
                <h2>Create Token</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newToken.name}
                    onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newToken.description}
                    onChange={(e) => setNewToken({ ...newToken, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    value={newToken.latitude}
                    onChange={(e) => setNewToken({ ...newToken, latitude: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={newToken.longitude}
                    onChange={(e) => setNewToken({ ...newToken, longitude: e.target.value })}
                />
                <button type="submit">Create Token</button>
            </form>

            {editToken && (
                <form onSubmit={handleUpdateToken}>
                    <h2>Edit Token</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editToken.name}
                        onChange={(e) => setEditToken({ ...editToken, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editToken.description}
                        onChange={(e) => setEditToken({ ...editToken, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={editToken.latitude}
                        onChange={(e) => setEditToken({ ...editToken, latitude: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={editToken.longitude}
                        onChange={(e) => setEditToken({ ...editToken, longitude: e.target.value })}
                    />
                    <button type="submit">Update Token</button>
                    <button onClick={() => setEditToken(null)}>Cancel</button>
                </form>
            )}

            <ul>
                {tokens.map((token) => (
                    <li key={token._id}>
                        {token.name} - {token.description}
                        <button onClick={() => handleEditToken(token)}>Edit</button>
                        <button onClick={() => handleDeleteToken(token._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;