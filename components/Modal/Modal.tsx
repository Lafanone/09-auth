'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback, ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const router = useRouter();
  const shouldShow = isOpen === undefined ? true : isOpen;
  const handleDismiss = useCallback(() => {
    if (onClose) {
      onClose(); 
    } else {
      router.back(); 
    }
  }, [onClose, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss();
    };

    if (shouldShow) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shouldShow, handleDismiss]);

  if (!shouldShow) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '1.5rem',
            lineHeight: 1
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}