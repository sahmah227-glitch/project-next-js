import { NextResponse } from 'next/server';
import { dummyProducts } from '@/services/dummyData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  let filteredProducts = dummyProducts;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  }

  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter((product) => product.category === category);
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= parseFloat(maxPrice));
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json(filteredProducts);
}
