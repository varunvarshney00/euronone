import { View, Text, Touchable, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Header from '../components/HomeScreen/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env';
import RazorpayCheckout from 'react-native-razorpay';

const EuronPlus: React.FC = () => {
  
  // console.log(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
  const razorpayKeyId: string | undefined = RAZORPAY_KEY_ID;
  const razorpayKeySecret: string | undefined = RAZORPAY_KEY_SECRET;

  const amount: number = 2999;
  const currency: string = 'INR';

  const handlePayment = (): void => {

    if (!razorpayKeyId || !razorpayKeySecret) {
      Alert.alert('Error', 'Razorpay keys are missing. Please check your environment configuration.');
      return;
    }


    var options = {
      description: 'Euron Plus subscription',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: currency,
      key: razorpayKeyId,
      amount: amount * 100,
      name: 'My customer 1',
      order_id: '',
      prefill: {
        email: 'xyz@gmail.com',
        contact: '91-9999999999',
        name: 'Person Name',
      },
      theme: { color: '#53a20e' },
    };

    RazorpayCheckout.open(options)
      .then((data: { razorpay_payment_id: string }) => {
        // console.log('data-->', data);
        // Handle success
        Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error: { code: number; description: string }) => {
        // Handle failure
        Alert.alert('Payment Failed', `Code: ${error.code}\nDescription: ${error.description}`);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B0B' }}>
      <Header user={null} />
      <Text style={{ color: 'white', textAlign: 'center' }}>Welcome to Euron Plus</Text>
      <Text style={{ color: 'white', textAlign: 'center' }}>Access the whole of Euron just by having one subscription for a year and be ready for the next challenge</Text>
      <Text style={{ color: 'white', textAlign: 'center' }}>Starting at INR 2999/year   (cancel anytime)</Text>

      <TouchableOpacity style={{ marginTop: 100 }} onPress={handlePayment}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Start Subscription</Text>
      </TouchableOpacity>

      <Text style={{color:'white', textAlign: 'center', marginTop:100 }}>iskey neechey toh poora ui hai, ye toh ho hi jayega </Text>
    </SafeAreaView>

  );
};

export default EuronPlus;
