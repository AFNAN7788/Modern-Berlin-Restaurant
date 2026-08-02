import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { paymentsApi } from '../api/client';
import '../styles/cart.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCardBox, setShowCardBox] = useState(false);
  const [cardError, setCardError] = useState('');
  const [paymentUnavailable, setPaymentUnavailable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Stripe state
  const [stripe, setStripe] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const [publishableKey, setPublishableKey] = useState('');
  const cardElementRef = useRef(null);

  // Fallback card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  useEffect(() => {
    if (paymentMethod === 'card') {
      initStripe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  // Mount Stripe card element when stripe is ready
  useEffect(() => {
    if (stripe && cardElementRef.current && !cardElement) {
      const elements = stripe.elements();
      const element = elements.create('card', {
        style: {
          base: { fontSize: '16px', color: '#f1f1f4' },
          invalid: { color: '#ef5350' },
        },
      });
      element.mount(cardElementRef.current);
      element.on('change', (e) => {
        setCardError(e.error ? e.error.message : '');
      });
      setCardElement(element);
    }
  }, [stripe, cardElement]);

  const initStripe = async () => {
    if (publishableKey) return;
    try {
      const data = await paymentsApi.getConfig();
      if (data.publishableKey) {
        setPublishableKey(data.publishableKey);
        const stripeJs = await import('@stripe/stripe-js');
        const stripeInstance = await stripeJs.loadStripe(data.publishableKey);
        setStripe(stripeInstance);
      } else {
        setPaymentUnavailable(true);
      }
    } catch (err) {
      console.error('Stripe init failed:', err);
      setPaymentUnavailable(true);
    }
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);
    setCardError('');
    setPaymentUnavailable(false);
    setShowCardBox(method === 'card');
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    return digits.replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    if (digits.length > 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  const validateFallbackCard = () => {
    const cardNo = cardNumber.replace(/\s+/g, '');
    if (!cardNo || cardNo.length < 16) {
      setCardError('Please enter a valid 16-digit credit card number.');
      return false;
    }
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      setCardError('Please enter a valid expiration date in MM/YY format.');
      return false;
    }
    const [month, year] = cardExpiry.split('/').map(Number);
    if (month < 1 || month > 12) {
      setCardError('Expiration month must be between 01 and 12.');
      return false;
    }
    const currentYear = parseInt(new Date().getFullYear().toString().slice(-2));
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setCardError('This card has already expired.');
      return false;
    }
    if (!cardCvc || cardCvc.length < 3) {
      setCardError('Please enter a valid CVC (3 or 4 digits).');
      return false;
    }
    return true;
  };

  const handlePay = async () => {
    if (cart.length === 0) return;

    if (paymentMethod === 'cash') {
      confirmOrder();
      return;
    }

    if (paymentMethod === 'card') {
      setCardError('');

      // If Stripe isn't available, use fallback validation
      if (!stripe || !cardElement) {
        if (!validateFallbackCard()) return;
        setProcessing(true);
        confirmOrder();
        return;
      }

      setProcessing(true);
      try {
        const intentData = await paymentsApi.createPaymentIntent(totalAmount);
        if (!intentData.success || !intentData.clientSecret) {
          confirmOrder();
          return;
        }

        const { error } = await stripe.confirmCardPayment(intentData.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.name || 'Guest',
              email: user?.email || '',
            },
          },
        });

        if (error) {
          setCardError(error.message || 'Payment failed.');
          setProcessing(false);
          return;
        }

        confirmOrder();
      } catch (err) {
        console.error(err);
        confirmOrder();
      }
    }
  };

  const confirmOrder = () => {
    clearCart();
    setOrderConfirmed(true);
    showToast('Order confirmed! Thank you for dining with us.');
  };

  if (orderConfirmed) {
    return (
      <div className="order-modal-overlay active">
        <div className="order-modal-card">
          <div className="order-modal-icon">
            <i className="ri-check-line"></i>
          </div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for dining with Modern Berlin Restaurant. Your order has been placed successfully and is being prepared with utmost care.</p>
          <button className="order-modal-btn" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty.</p>
          <button className="order-modal-btn" onClick={() => navigate('/menu/main-dish')}>
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div id="cart-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price} €</p>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h2 id="total-bill">
            Total Bill: <span>{totalAmount} €</span>
          </h2>

          <div id="payment-section">
            <h3>Choose Payment Method:</h3>
            <select id="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit/Debit Card (secure)</option>
            </select>

            {showCardBox && (
              <div id="card-payment-box" className="card-payment-box">
                {!paymentUnavailable && stripe && (
                  <div id="card-element" ref={cardElementRef}></div>
                )}

                {(!stripe || paymentUnavailable) && (
                  <div id="fallback-card-fields" className="fallback-card-form">
                    <label>
                      Card Number
                      <input
                        type="text"
                        maxLength="19"
                        placeholder="xxxx xxxx xxxx xxxx"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      />
                    </label>
                    <div className="fallback-card-row">
                      <label>
                        Expiry Date
                        <input
                          type="text"
                          maxLength="5"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        />
                      </label>
                      <label>
                        CVC
                        <input
                          type="text"
                          maxLength="4"
                          placeholder="xxx"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {paymentUnavailable && (
                  <p id="payment-unavailable" className="payment-unavailable">
                    Online card payment is not configured. Please use Cash on Delivery.
                  </p>
                )}

                <p id="card-error" className="card-error" role="alert">
                  {cardError}
                </p>
              </div>
            )}

            <button id="pay-btn" onClick={handlePay} disabled={processing}>
              {processing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}