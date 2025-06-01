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
      <div className="home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 className="loading-text">Loading our amazing products...</h2>
          <p className="loading-subtext">
            Please wait while we fetch the latest items for you
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Shopee</h1>
          <p className="hero-subtitle">
            Discover amazing products at unbeatable prices
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{productLists.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h2>Our Products</h2>
          <p>Choose from our wide selection of quality items</p>
        </div>

        {/* Filters and Sort */}
        <div className="products-controls">
          <div className="filters-container">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all"
                    ? "All Products"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-container">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(
              ({ id, title, rating, price, image, description, category }) => (
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
            <div className="no-products">
              <div className="no-products-icon">📦</div>
              <h3>No products found</h3>
              <p>
                Try selecting a different category or adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {/* Products Count */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="products-count">
            Showing {filteredAndSortedProducts.length} of {productLists.length}{" "}
            products
          </div>
        )}
      </section>
    </div>
  );
}
