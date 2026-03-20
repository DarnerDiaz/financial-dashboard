import { NextResponse } from 'next/server';

const COINGECKO = 'https://api.coingecko.com/api/v3';

export async function GET(req: Request, context: any) {
  try {
    const resolvedParams = context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;
    const { id } = resolvedParams || {};
    const url = `${COINGECKO}/coins/${encodeURIComponent(id)}?localization=false&sparkline=false`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ error: 'CoinGecko error' }, { status: 502 });
    }

    const data = await res.json();

    const mapped = {
      id: data.id,
      symbol: data.symbol.toUpperCase(),
      name: data.name,
      image: data.image?.large ?? data.image?.thumb ?? null,
      current_price: data.market_data?.current_price?.usd ?? null,
      market_cap_rank: data.market_cap_rank,
      market_cap: data.market_data?.market_cap?.usd ?? null,
      total_volume: data.market_data?.total_volume?.usd ?? null,
      high_24h: data.market_data?.high_24h?.usd ?? null,
      low_24h: data.market_data?.low_24h?.usd ?? null,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h ?? null,
      price_change_24h: data.market_data?.price_change_24h?.usd ?? null,
      market_cap_change_percentage_24h: data.market_data?.market_cap_change_percentage_24h ?? null,
      ath: data.market_data?.ath?.usd ?? null,
      atl: data.market_data?.atl?.usd ?? null,
    };

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }
}
