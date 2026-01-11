import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { noteService } from '../../services/api';
import { useSocket } from '../../hooks/useSocket';

const Editor = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const { remoteContent, updateContent } = useSocket(id);

    useEffect(() => {
        noteService.getNote(id).then(res => setContent(res.data.data.content));
    }, [id]);

    useEffect(() => { if (remoteContent) setContent(remoteContent); }, [remoteContent]);

    const handleChange = (val) => { setContent(val); updateContent(val); };

    return (
        <div className="editor-container">
            <div className="editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>Édition de Note</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>● Collaboration active</span>
                </div>
            </div>
            <div className="editor-body" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <ReactQuill theme="snow" value={content} onChange={handleChange} />
            </div>
        </div>
    );
};
export default Editor;
