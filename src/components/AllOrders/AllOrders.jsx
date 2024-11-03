import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AllOrders({userData}) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders()
    
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        <i className="fas fa-boxes text-primary me-2"></i>Order History
      </h2>
      {isLoading ? (
        <div className="text-center">
          <i className="fas fa-spinner fa-spin fa-3x text-primary"></i>
        </div>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>
                <i className="fas fa-receipt me-2"></i>Order ID: {order._id}
              </span>
              <span>
                <i className="fas fa-money-bill-wave me-2"></i>Total: {order.totalOrderPrice} EGP
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-shipping-fast me-2"></i>Shipping Details
              </h5>
              <p>
                <i className="fas fa-map-marker-alt me-2"></i>
                <strong>Address:</strong> {order.shippingAddress.details}
              </p>
              <p>
                <i className="fas fa-city me-2"></i>
                <strong>City:</strong> {order.shippingAddress.city}
              </p>
              <p>
                <i className="fas fa-phone me-2"></i>
                <strong>Phone:</strong> {order.shippingAddress.phone}
              </p>
              <p>
                <i className="fas fa-credit-card me-2"></i>
                <strong>Payment:</strong> {order.paymentMethodType}
              </p>
              <p>
                <i className="fas fa-check me-2"></i>
                <strong>Status:</strong> {order.isDelivered ? "Delivered" : "Not Delivered"}
              </p>
              <p>
                <i className="fas fa-dollar-sign me-2"></i>
                <strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}
              </p>

              <h5 className="mt-4">
                <i className="fas fa-box-open me-2"></i>Order Items
              </h5>
              {order.cartItems.map((item) => (
                <div key={item._id} className="d-flex align-items-center border-top pt-3">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="img-fluid me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div>
                    <h6>{item.product.title}</h6>
                    <p>
                      <i className="fas fa-tag me-2"></i>
                      <strong>Price:</strong> {item.price} EGP
                    </p>
                    <p>
                      <i className="fas fa-sort-numeric-up me-2"></i>
                      <strong>Quantity:</strong> {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer text-muted">
              <i className="fas fa-calendar-alt me-2"></i>
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">
          <i className="fas fa-exclamation-circle me-2"></i>No orders found.
        </p>
      )}
    </div>
  );
}
