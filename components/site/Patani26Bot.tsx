'use client';

import { FormEvent, useRef, useState } from 'react';
import {
  Bot,
  Loader2,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Patani26Bot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sessionId = useRef(`session-${Date.now()}`);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Halo 👋 Saya Patani26Bot. Ada yang bisa saya bantu tentang harga beras, stok, cara pesan, pengiriman, atau kemitraan?',
    },
  ]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: text,
      },
    ]);

    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId.current,
        }),
      });

      const raw = await response.text();

      let data: any;

      try {
        data = JSON.parse(raw);
      } catch {
        console.error('Response bukan JSON:', raw);

        throw new Error(
          'API chatbot belum merespons dengan benar.'
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.error ||
            'Chatbot gagal memproses pesan.'
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data?.output ||
            'Maaf, saya belum mendapatkan jawaban.',
        },
      ]);
    } catch (error: any) {
      console.error('Patani26Bot error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            error?.message ||
            'Maaf, terjadi gangguan. Silakan coba lagi.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-[99999] flex h-[500px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl sm:right-6">
          <div className="flex items-center justify-between bg-emerald-700 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold">Patani26Bot</p>
                <p className="text-xs text-emerald-100">
                  Asisten BerasPatani26
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 hover:bg-white/10"
              aria-label="Tutup chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    message.role === 'user'
                      ? 'max-w-[82%] rounded-2xl rounded-br-md bg-emerald-600 px-4 py-3 text-sm text-white'
                      : 'max-w-[82%] rounded-2xl rounded-bl-md border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm'
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sedang menjawab...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex gap-2 border-t border-stone-200 bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan tentang beras..."
              className="min-w-0 flex-1 rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Kirim pesan"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 z-[99999] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl transition hover:scale-105 hover:bg-emerald-700 sm:right-6"
        aria-label="Buka Patani26Bot"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
}