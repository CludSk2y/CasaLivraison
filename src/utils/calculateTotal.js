const calculateTotal = (items, deliveryFee = 45) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
};

module.exports = calculateTotal;
