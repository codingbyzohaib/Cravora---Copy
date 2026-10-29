import { useState } from "react";

export default function Checkout({ cart = [], onPlaceOrder, onBack }) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    instructions: "",
  });

  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty. Please add some food first.");
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    if (!customer.address.trim() || !customer.city.trim()) {
      setError("Please enter your delivery address and city.");
      return;
    }

    const order = {
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        instructions: customer.instructions.trim(),
      },
      items: cart.map((item) => ({
        ...item,
        quantity: item.quantity,
      })),
      total,
      paymentMethod: "Cash on Delivery",
      orderDate: new Date().toISOString(),
    };

    if (typeof onPlaceOrder === "function") {
      onPlaceOrder(order);
    } else {
      setError("Checkout is not connected yet. Please try again later.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#fffaf5",
      padding: "45px 6%",
      color: "#29251f",
      fontFamily: "inherit",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    back: {
      border: "none",
      background: "transparent",
      color: "#a84b2f",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "25px",
      padding: "8px 0",
    },
    heading: {
      fontSize: "clamp(30px, 4vw, 43px)",
      margin: "0 0 10px",
      fontWeight: "800",
    },
    subtitle: {
      color: "#77716b",
      marginBottom: "35px",
      lineHeight: 1.6,
    },
    layout: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 1fr)",
      gap: "28px",
      alignItems: "start",
    },
    card: {
      background: "#ffffff",
      border: "1px solid #eee5dc",
      borderRadius: "18px",
      padding: "28px",
      boxShadow: "0 8px 30px rgba(60, 40, 20, 0.05)",
    },
    sectionTitle: {
      fontSize: "21px",
      margin: "0 0 22px",
      fontWeight: "750",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "650",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "13px 14px",
      border: "1px solid #e6ddd4",
      borderRadius: "10px",
      fontSize: "15px",
      outlineColor: "#b95b3c",
      background: "#fffdfb",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    field: {
      marginBottom: "19px",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
      padding: "15px 0",
      borderBottom: "1px solid #f0e9e2",
      fontSize: "14px",
    },
    muted: {
      color: "#827a72",
      fontSize: "13px",
      marginTop: "5px",
    },
    total: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
      fontSize: "19px",
      fontWeight: "800",
      marginTop: "22px",
    },
    button: {
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: "11px",
      background: "#b94f30",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "750",
      cursor: "pointer",
      marginTop: "24px",
    },
    error: {
      background: "#fff0ed",
      border: "1px solid #f2c7bd",
      color: "#a83220",
      padding: "12px 14px",
      borderRadius: "9px",
      marginBottom: "20px",
      fontSize: "14px",
    },
    empty: {
      padding: "20px 0",
      color: "#77716b",
      lineHeight: 1.6,
    },
    payment: {
      background: "#fff8ef",
      border: "1px solid #f0e2d1",
      borderRadius: "11px",
      padding: "15px",
      fontSize: "14px",
      lineHeight: 1.6,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button type="button" style={styles.back} onClick={onBack}>
          ← Back to Menu
        </button>

        <h1 style={styles.heading}>Complete Your Order</h1>

        <p style={styles.subtitle}>
          Just a few details and your favourite food will be on its way.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.layout}>
            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Delivery Information</h2>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="customer-name">
                  Full Name
                </label>

                <input
                  id="customer-name"
                  style={styles.input}
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={customer.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="customer-phone">
                  Phone Number
                </label>

                <input
                  id="customer-phone"
                  style={styles.input}
                  type="tel"
                  name="phone"
                  placeholder="03XX XXXXXXX"
                  value={customer.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="customer-address">
                  Delivery Address
                </label>

                <textarea
                  id="customer-address"
                  style={{
                    ...styles.input,
                    minHeight: "105px",
                    resize: "vertical",
                  }}
                  name="address"
                  placeholder="House number, street, area..."
                  value={customer.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="customer-city">
                  City
                </label>

                <input
                  id="customer-city"
                  style={styles.input}
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={customer.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div style={styles.field}>
                <label
                  style={styles.label}
                  htmlFor="customer-instructions"
                >
                  Delivery Instructions (Optional)
                </label>

                <textarea
                  id="customer-instructions"
                  style={{
                    ...styles.input,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  name="instructions"
                  placeholder="Any special instructions for delivery?"
                  value={customer.instructions}
                  onChange={handleChange}
                />
              </div>

              <h3 style={{ fontSize: "17px", margin: "28px 0 14px" }}>
                Payment Method
              </h3>

              <div style={styles.payment}>
                <strong>Cash on Delivery</strong>
                <br />
                Pay when your food arrives at your doorstep.
              </div>
            </section>

            <aside style={styles.card}>
              <h2 style={styles.sectionTitle}>Your Order</h2>

              {cart.length === 0 ? (
                <p style={styles.empty}>
                  Your cart is empty. Add some delicious food to continue.
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={styles.item}>
                    <div>
                      <strong>{item.name}</strong>

                      <div style={styles.muted}>
                        Quantity: {item.quantity}
                      </div>
                    </div>

                    <strong>
                      Rs.{" "}
                      {(
                        Number(item.price) * item.quantity
                      ).toLocaleString("en-PK")}
                    </strong>
                  </div>
                ))
              )}

              <div style={styles.total}>
                <span>Total</span>
                <span>Rs. {total.toLocaleString("en-PK")}</span>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: cart.length === 0 ? 0.6 : 1,
                }}
              >
                Place Order →
              </button>

              <p
                style={{
                  color: "#827a72",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  textAlign: "center",
                  marginBottom: 0,
                }}
              >
                Please check your delivery details before placing your order.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
}