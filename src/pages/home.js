import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

import Product from "../Components/Product";
import {
  getAllProducts,
  getProductError,
  getProductLoadingState,
} from "../store/slices/productSlice";

export default function Home() {
  const productLists = useSelector(getAllProducts);
  const isLoading = useSelector(getProductLoadingState);
  const error = useSelector(getProductError);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(productLists.map((product) => product.category)),
    ];
    return ["all", ...uniqueCategories];
  }, [productLists]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? productLists
        : productLists.filter(
            (product) => product.category === selectedCategory
          );

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
      case "name":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [productLists, selectedCategory, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Loading our amazing products...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch the latest items for you
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Welcome to Shopee
          </h1>
          <p className="text-xl text-center text-gray-200 mb-12">
            Discover amazing products at unbeatable prices
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[120px]">
              <span className="block text-3xl font-bold">
                {productLists.length}
              </span>
              <span className="text-gray-200">Products</span>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[120px]">
              <span className="block text-3xl font-bold">
                {categories.length - 1}
              </span>
              <span className="text-gray-200">Categories</span>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[120px]">
              <span className="block text-3xl font-bold">100%</span>
              <span className="text-gray-200">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our wide selection of quality items
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category === "all"
                        ? "All Products"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:w-64">
                <label
                  htmlFor="sort-select"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map(
                ({
                  id,
                  title,
                  rating,
                  price,
                  image,
                  description,
                  category,
                }) => (
                  <Product
                    key={id}
                    productId={id}
                    title={title}
                    rating={rating.rate}
                    price={price}
                    imageUrl={image}
                    description={description}
                    category={category}
                  />
                )
              )
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try selecting a different category or adjusting your filters.
                </p>
              </div>
            )}
          </div>

          {/* Products Count */}
          {filteredAndSortedProducts.length > 0 && (
            <div className="text-center mt-8 text-gray-600">
              Showing {filteredAndSortedProducts.length} of{" "}
              {productLists.length} products
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
