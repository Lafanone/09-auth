'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import styles from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateMe({ username });

      setUser(updatedUser);
      
      router.back();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.avatarContainer}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={100}
            height={100}
            className={styles.avatar}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className={`${styles.input} ${styles.readOnly}`}
            disabled
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>User name</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={styles.input}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={handleCancel} 
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || username.trim() === '' || username === user.username}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}