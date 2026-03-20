import { NextResponse } from 'next/server';

const COINGECKO = 'https://api.coingecko.com/api/v3';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ?? '10';

    const url = `${COINGECKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${encodeURIComponent(
      limit
    )}&sparkline=false&locale=es`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ error: 'CoinGecko error' }, { status: 502 });
    }

    const data = await res.json();

    const mapped = data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap_rank: coin.market_cap_rank,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      price_change_24h: coin.price_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      ath: coin.ath,
      atl: coin.atl,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }
}
