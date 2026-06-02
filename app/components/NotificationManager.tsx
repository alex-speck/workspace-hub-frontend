'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { hideNotification } from '../redux/slices/notification.slice';
import MessageModal from './MessageModal';

const NotificationManager = () => {
    const dispatch = useDispatch();
    const { isOpen, title, message, type } = useSelector((state: RootState) => state.notification);

    const handleClose = () => {
        dispatch(hideNotification());
    };

    return (
        <MessageModal
            isOpen={isOpen}
            title={title}
            message={message}
            type={type}
            onClose={handleClose}
        />
    );
};

export default NotificationManager;
