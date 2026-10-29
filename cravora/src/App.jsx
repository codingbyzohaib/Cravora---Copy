import { useState } from "react";
import {
  Search,
  ShoppingBag,
  MapPin,
  Star,
  Plus,
  ArrowRight,
  Menu,
  X,
  UtensilsCrossed,
  Clock,
  CheckCircle,
} from "lucide-react";
import "./App.css";
import Checkout from "./pages/Checkout";

const foods = [
  {
    id: 1,
    name: "Smash Burger",
    category: "Burgers",
    restaurant: "The Burger House",
    price: 650,
    rating: 4.9,
    time: "20-30 min",
    image:
      "https://i.pinimg.com/1200x/ec/a1/ad/eca1ad6efcc255a05c53b51ff9833829.jpg",
  },
  {
    id: 2,
    name: "Italian Pizza",
    category: "Pizza",
    restaurant: "Oven & Stone",
    price: 1100,
    rating: 4.8,
    time: "25-35 min",
    image:
      "https://i.pinimg.com/1200x/e6/1c/ef/e61cef37dffe3af9ce48d9e119176203.jpg",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Biryani",
    restaurant: "Desi Kitchen",
    price: 480,
    rating: 4.9,
    time: "20-30 min",
    image:
      "https://i.pinimg.com/1200x/1a/59/f0/1a59f0e988c227075ce7a6e261f9f362.jpg",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    category: "Desserts",
    restaurant: "Sugar Studio",
    price: 550,
    rating: 4.7,
    time: "15-25 min",
    image:
      "https://i.pinimg.com/736x/b2/12/74/b212743f38a1cc32232c2d097ef5762d.jpg",
  },
  {
    id: 5,
    name: "Crispy Chicken",
    category: "Fast Food",
    restaurant: "Crunch Club",
    price: 720,
    rating: 4.8,
    time: "25-35 min",
    image:
      "https://i.pinimg.com/736x/2e/ef/d9/2eefd9ed31758d9e8c5d479ef72fbbfa.jpg",
  },
  {
    id: 6,
    name: "Fresh Juice",
    category: "Drinks",
    restaurant: "Fresh Press",
    price: 250,
    rating: 4.6,
    time: "10-20 min",
    image:
      "https://i.pinimg.com/1200x/6a/03/9a/6a039a0a80a4fd97093f62e2346fae15.jpg",
  },
];

const categories = [
  { name: "All", emoji: "🍽️" },
  { name: "Burgers", emoji: "🍔" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Fast Food", emoji: "🍟" },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [placedOrder, setPlacedOrder] = useState(null);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.restaurant.toLowerCase().includes(search.toLowerCase());

    return (
      matchesSearch &&
      (category === "All" || food.category === category)
    );
  });

  const addToCart = (food) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === food.id);

      if (exists) {
        return current.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...food, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal === 0 || subtotal >= 2000 ? 0 : 150;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (order) => {
    const completedOrder = {
      ...order,
      subtotal,
      deliveryFee,
      total,
      orderNumber: `CRV-${Date.now().toString().slice(-8)}`,
    };

    setPlacedOrder(completedOrder);
    setCart([]);
    setCartOpen(false);
    setCurrentPage("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "checkout") {
    return (
      <Checkout
        cart={cart}
        onBack={() => setCurrentPage("home")}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  if (currentPage === "success" && placedOrder) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fffaf5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 20px",
          fontFamily: "inherit",
          color: "#29251f",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "#fff",
            border: "1px solid #eee5dc",
            borderRadius: "22px",
            padding: "40px 28px",
            textAlign: "center",
            boxShadow: "0 12px 40px rgba(60,40,20,0.07)",
          }}
        >
          <CheckCircle
            size={72}
            color="#3a9462"
            strokeWidth={1.7}
            style={{ marginBottom: "18px" }}
          />

          <span
            style={{
              display: "block",
              color: "#3a9462",
              fontWeight: "700",
              fontSize: "13px",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}
          >
            ORDER CONFIRMED
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 38px)",
              margin: "0 0 12px",
            }}
          >
            Thank you for your order!
          </h1>

          <p style={{ color: "#77716b", lineHeight: 1.7 }}>
            Your order details have been received by this demo website.
          </p>

          <div
            style={{
              background: "#f7f8f1",
              borderRadius: "13px",
              padding: "18px",
              margin: "25px 0",
              textAlign: "left",
              lineHeight: 1.9,
            }}
          >
            <div>
              <strong>Order number:</strong> {placedOrder.orderNumber}
            </div>

            <div>
              <strong>Name:</strong> {placedOrder.customer.name}
            </div>

            <div>
              <strong>Phone:</strong> {placedOrder.customer.phone}
            </div>

            <div>
              <strong>Delivery address:</strong>{" "}
              {placedOrder.customer.address}, {placedOrder.customer.city}
            </div>

            <div>
              <strong>Payment:</strong> Cash on Delivery
            </div>

            <div>
              <strong>Total:</strong>{" "}
              Rs. {Number(placedOrder.total).toLocaleString("en-PK")}
            </div>
          </div>

          <h3 style={{ textAlign: "left" }}>Order summary</h3>

          {placedOrder.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                padding: "10px 0",
                borderBottom: "1px solid #eee5dc",
                textAlign: "left",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                Rs.{" "}
                {(Number(item.price) * item.quantity).toLocaleString("en-PK")}
              </strong>
            </div>
          ))}

          <button
            className="primary-button"
            style={{
              marginTop: "28px",
              justifyContent: "center",
              width: "100%",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setPlacedOrder(null);
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to Cravora <ArrowRight size={18} />
          </button>

          <p
            style={{
              fontSize: "12px",
              color: "#827a72",
              lineHeight: 1.6,
              marginTop: "18px",
            }}
          >
            Demo only: this order is not saved to a database or sent to a
            restaurant.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="topbar">
          <span>✦ GOOD FOOD, GOOD MOOD</span>
          <span>Free delivery on orders over Rs. 2,000</span>
        </div>

        <header className="navbar">
          <a href="#home" className="logo">
            <span className="logo-icon">
              <UtensilsCrossed size={23} />
            </span>
            cravora<span className="logo-dot">.</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <nav className={mobileOpen ? "nav-links nav-open" : "nav-links"}>
            <a href="#home" onClick={() => setMobileOpen(false)}>
              Home
            </a>
            <a href="#categories" onClick={() => setMobileOpen(false)}>
              Categories
            </a>
            <a href="#menu" onClick={() => setMobileOpen(false)}>
              Explore food
            </a>
            <a href="#about" onClick={() => setMobileOpen(false)}>
              About
            </a>
          </nav>

          <div className="nav-actions">
            <span className="delivery-location">
              <MapPin size={17} />
              <span>
                <small>Deliver to</small>
                <strong>Lahore, PK</strong>
              </span>
            </span>

            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} />
              <span>Cart</span>
              <b>{cartCount}</b>
            </button>
          </div>
        </header>
      </div>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
           

            <h1>
              Good food.
              <br />
              <span>Great mood.</span>
            </h1>

            <p>
              Cravings don't wait, and neither should you.
              Discover the flavours you love, delivered fresh to your door.
            </p>

            <div className="hero-buttons">
              <a href="#menu" className="primary-button">
                Order your favourites <ArrowRight size={18} />
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-rating">
                <span className="rating-stars">★★★★★</span>
                <strong>4.9/5</strong>
                <small>Loved by foodies</small>
              </div>

              <div className="stats-divider"></div>

              <div className="hero-delivery">
                <Clock size={22} />
                <span>
                  <strong>30 min</strong>
                  <small>Average delivery</small>
                </span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=90"
                alt="Freshly prepared delicious food"
              />
            </div>

            <div className="floating-card floating-top">
              <span className="floating-emoji">🍔</span>
              <span>
                <strong>Made fresh</strong>
                <small>Just for you</small>
              </span>
            </div>

            <div className="floating-card floating-bottom">
              <span className="floating-check">✓</span>
              <span>
                <strong>Hot & delicious</strong>
                <small>At your doorstep</small>
              </span>
            </div>
          </div>
        </section>

        <section className="categories section" id="categories">
          <div className="section-heading">
            <div>
              
              <h2>
                What's on your <span>mind?</span>
              </h2>
            </div>

            <a href="#menu" className="text-link">
              Explore all <ArrowRight size={16} />
            </a>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item.name}
                className={
                  category === item.name
                    ? "category-item category-active"
                    : "category-item"
                }
                onClick={() => {
                  setCategory(item.name);
                  document.getElementById("menu")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span className="category-emoji">{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="menu-section section" id="menu">
          <div className="section-heading menu-heading">
            <div>
              

              <h2>
                Popular <span>picks.</span>
              </h2>

              <p className="section-subtitle">
                Fresh flavours, big smiles. Start with these favourites.
              </p>
            </div>

            <label className="search-box">
              <Search size={19} />

              <input
                type="search"
                placeholder="Search food or restaurant..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="food-grid">
            {filteredFoods.map((food) => (
              <article className="food-card" key={food.id}>
                <div className="food-image-wrap">
                  <img src={food.image} alt={food.name} />
                  <span className="food-badge">FAN FAVOURITE</span>

                  <span className="food-rating">
                    <Star size={14} fill="currentColor" /> {food.rating}
                  </span>
                </div>

                <div className="food-info">
                  <div className="food-name-row">
                    <h3>{food.name}</h3>
                  </div>

                  <p className="restaurant-name">{food.restaurant}</p>

                  <div className="food-bottom">
                    <div>
                      <strong className="food-price">
                        Rs. {food.price.toLocaleString("en-PK")}
                      </strong>

                      <span className="food-time">
                        <Clock size={13} /> {food.time}
                      </span>
                    </div>

                    <button
                      className="add-button"
                      onClick={() => addToCart(food)}
                      aria-label={`Add ${food.name} to cart`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="empty-state">
              <span>🍽️</span>
              <h3>No food found</h3>
              <p>Try a different dish or restaurant name.</p>

              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all food
              </button>
            </div>
          )}
        </section>

        <section className="about-strip" id="about">
          <div className="about-icon">♥</div>

          <div>
          
            <h2>Good food brings us together.</h2>
            <p>
              Discover local flavours and enjoy a little happiness in every bite.
            </p>
          </div>

          <a href="#menu" className="about-link" aria-label="Explore menu">
            <ArrowRight size={22} />
          </a>
        </section>
      </main>

      {/* Updated footer only */}
      <footer
        className="footer"
        style={{
          backgroundColor: "#171714",
          color: "#f8f5ee",
          padding: "45px 6% 20px",
          borderTop: "1px solid #393832",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
          <div style={{ maxWidth: "360px" }}>
            <a
              href="#home"
              className="logo"
              style={{
                color: "#f8f5ee",
                textDecoration: "none",
              }}
            >
              <span className="logo-icon">
                <UtensilsCrossed size={20} />
              </span>
              cravora<span className="logo-dot">.</span>
            </a>

            <p
              style={{
                color: "#c0bdb4",
                lineHeight: "1.8",
                marginTop: "15px",
                maxWidth: "320px",
              }}
            >
              Good food. Great mood. Delivered with love.
              Discover your favourite flavours with Cravora.
            </p>
          </div>

          <div>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "17px",
                marginBottom: "18px",
              }}
            >
              Connect with me
            </h3>

          

            <a
              href="mailto:zohaibawan6986@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#c0bdb4",
                textDecoration: "none",
              }}
            >
              Email: zohaibawan6986@gmail.com
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #393832",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            color: "#a9a69d",
            fontSize: "13px",
          }}
        >
          <span>© 2026 Cravora. All rights reserved.</span>

          <span>
            Created by{" "}
            <strong style={{ color: "#f8f5ee" }}>
              Zohaib Ahmed Awan
            </strong>
          </span>
        </div>
      </footer>

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="section-label">YOUR ORDER</span>
                <h2>
                  Your basket <span>({cartCount})</span>
                </h2>
              </div>

              <button
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={23} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={42} />
                <h3>Your basket is waiting</h3>
                <p>Add something delicious to get started.</p>

                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  Explore food
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>Rs. {item.price.toLocaleString("en-PK")}</p>

                        <div className="quantity-control">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>Rs. {subtotal.toLocaleString("en-PK")}</strong>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <strong>
                      {deliveryFee === 0
                        ? "FREE"
                        : `Rs. ${deliveryFee.toLocaleString("en-PK")}`}
                    </strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>Rs. {total.toLocaleString("en-PK")}</strong>
                  </div>

                  <button
                    className="primary-button checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCurrentPage("checkout");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Continue to checkout <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;