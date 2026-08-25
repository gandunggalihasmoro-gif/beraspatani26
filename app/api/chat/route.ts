import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === 'string'
        ? body.message.trim()
        : '';

    if (!message) {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong.' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook n8n belum dikonfigurasi.' },
        { status: 500 }
      );
    }

    const sessionId =
      body?.sessionId || crypto.randomUUID();

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        message,
        chatInput: message,
        sessionId,
      }),
      cache: 'no-store',
    });

    const raw = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'n8n gagal memproses pesan.',
          detail: raw.slice(0, 500),
        },
        { status: 502 }
      );
    }

    let data: any;

    try {
      data = JSON.parse(raw);
    } catch {
      data = { output: raw };
    }

    return NextResponse.json({
      output:
        data?.output ||
        data?.response ||
        data?.message ||
        data?.text ||
        'Maaf, chatbot belum mendapatkan jawaban.',
      sessionId,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Terjadi kesalahan pada chatbot.',
      },
      { status: 500 }
    );
  }
}