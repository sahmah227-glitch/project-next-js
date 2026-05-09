import ProductCard from './ProductCard';
import { dummyProducts } from '../services/dummyData';

export default function ProductGrid() {
  return (
    <section id="products" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Trending Now</h2>
            <p className="mt-2 text-lg text-gray-500">Carefully selected essentials for modern living.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-500 transition-colors flex items-center">
              View all products
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
