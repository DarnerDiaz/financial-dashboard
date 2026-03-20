import { NextResponse } from 'next/server';

const COINGECKO = 'https://api.coingecko.com/api/v3';

export async function GET() {
  try {
    const url = `${COINGECKO}/global`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ error: 'CoinGecko error' }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data.data ?? data);
  } catch (error) {
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }
}
