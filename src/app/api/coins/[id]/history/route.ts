import { NextResponse } from 'next/server';

const COINGECKO = 'https://api.coingecko.com/api/v3';

export async function GET(req: Request, context: any) {
  try {
    const { searchParams } = new URL(req.url);
    const resolvedParams = context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;
    const { id } = resolvedParams || {};
    const days = searchParams.get('days') ?? '30';

    const url = `${COINGECKO}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=${encodeURIComponent(days)}&interval=daily`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ error: 'CoinGecko error' }, { status: 502 });
    }

    const data = await res.json();

    const mapped = (data.prices || []).map((p: any) => ({
      date: p[0],
      price: Number(Number(p[1]).toFixed(2)),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }
}
