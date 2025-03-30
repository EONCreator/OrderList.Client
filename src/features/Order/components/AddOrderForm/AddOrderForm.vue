<script lang="ts" setup>
  import { 
    BaseButton, 
    BaseCheckbox, 
    BaseInput, 
    BaseCombobox, 
    BaseDate, 
    BaseTime,
    BaseRadioButton,

    Form,
    FormItem,
    FormInlineGroup
  } from '@/shared/ui'

  import { useOrderForm } from './addOrderForm';
  import router from '@/router';
  
  const {
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
  } = useOrderForm();

  const handleSubmitOrder = async () => {
    const result = await submitOrder();
    if (result) {
      router.push('/');
    }
  };

  const products = ["Samsung Galaxy S11", "iPhone 16", "Apple Watch"]
</script>

<template>
    <Form title="New order">
      <FormItem>
        <BaseInput 
          required
          text="First name"
          placeholder="Bob Smith"
          :error="firstNameError"
          v-model="firstName" />
      </FormItem>

      <FormItem>
        <BaseInput 
          required
          text="Address"
          placeholder="St. Petersburg, m. Petrogradskaya"
          :error="addressError"
          v-model="address" />
      </FormItem>

      <FormItem>
        <BaseCombobox
            v-model="product"
            text="Product"
            :small="false"
            :disabled="false"
            :values="products" />
      </FormItem>

      <FormInlineGroup>
        <FormItem>
          <BaseDate 
            text="Delivery date" 
            v-model="deliveryDate" />
        </FormItem>

        <FormItem>
          <BaseTime 
            text="Delivery time" 
            v-model="deliveryTime" />
        </FormItem>
      </FormInlineGroup>

      <FormInlineGroup>
        <FormItem>
          <BaseRadioButton 
            text="To the door" 
            v-model="deliveryMethod" />
        </FormItem>

        <FormItem>
          <BaseRadioButton 
            text="Pick up from point" 
            v-model="deliveryMethod" />
        </FormItem>
      </FormInlineGroup>

      <FormItem>
        <BaseCheckbox 
          text="Send notification to email" 
          v-model="sendNotification" />
      </FormItem>

      <FormItem>
        <BaseButton @click="handleSubmitOrder" text="OK" />
      </FormItem>
    </Form>
</template>