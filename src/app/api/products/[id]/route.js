import { NextResponse } from 'next/server';
import { dummyProducts } from '@/services/dummyData';

export async function GET(request, { params }) {
  const { id } = await params;
  const product = dummyProducts.find((p) => p.id === parseInt(id));

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
