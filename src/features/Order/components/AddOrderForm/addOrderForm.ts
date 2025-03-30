import { ref } from 'vue';
import type { Order } from '@/entities';
import { orderService } from '../../services/OrderService';

export const useOrderForm = () => {
  const firstName = ref('');
  const firstNameError = ref('');

  const address = ref('');
  const addressError = ref('');

  const product = ref('');
  const deliveryDate = ref('');
  const deliveryTime = ref('');
  const deliveryMethod = ref('To the door');
  const sendNotification = ref(false);

  const submitOrder = async () => {
    if (!firstName.value) {
      firstNameError.value = 'First name is required';
      return;
    } else {
      firstNameError.value = '';
    }

    if (!address.value) {
      addressError.value = 'Address is required';
      return;
    } else {
      addressError.value = '';
    }

    const order: Order = {
      firstName: firstName.value,
      address: address.value,
      product: product.value,
      deliveryDate: deliveryDate.value,
      deliveryTime: deliveryTime.value,
      deliveryMethod: deliveryMethod.value,
      sendNotification: sendNotification.value,
    };

    try {
      return await orderService.createOrder(order); 
    } catch (error) {
      return null;
    }
  };

  return {
    firstName,
    firstNameError,
    address,
    addressError,
    product,
    deliveryDate,
    deliveryTime,
    deliveryMethod,
    sendNotification,
    submitOrder,
  };
};