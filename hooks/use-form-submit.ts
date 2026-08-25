'use client';

import { useState, useCallback } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useFormSubmit(simulatedDelay = 1200) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const submit = useCallback(
    async (data: Record<string, unknown>) => {
      setStatus('submitting');
      setMessage('');
      try {
        await new Promise((resolve) => setTimeout(resolve, simulatedDelay));
        // Simulasi — data tidak disimpan ke database
        console.log('[Simulasi] Form submitted:', data);
        setStatus('success');
        setMessage('Data berhasil dikirim! Tim kami akan menghubungi Anda segera.');
        return { success: true };
      } catch {
        setStatus('error');
        setMessage('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
        return { success: false };
      }
    },
    [simulatedDelay]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage('');
  }, []);

  return { status, message, submit, reset };
}
