import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import Header from '../components/HomeScreen/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import { moderateScale } from 'react-native-size-matters';
import { Images } from '../assets';
import Clipboard from '@react-native-clipboard/clipboard';
import Video from 'react-native-video';


const EuronPlus: React.FC = () => {
  const videoRef = useRef<VideoRef>(null);
  const background = require('../assets/Reels/video1.mp4');
  // const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString('hello world varun');
  };



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

  // main return
  return (
    <SafeAreaView style={styles.container}>
      <Header user={null} />
      <ScrollView contentContainerStyle={styles.scrollview}>

        <Text style={styles.welcometoeuron}>Welcome to Euron Plus</Text>
        <Text style={styles.accesseuron}>Access the whole of Euron just by having one subscription for a year and be ready for the next challenge</Text>
        <Text style={styles.price}>

          <Text style={styles.startingat}>Starting at </Text>
          INR 2999/year
        </Text>

        <View style={styles.subscriptionbuttoncontainer}>
          <TouchableOpacity style={styles.subscriptionbutton} onPress={handlePayment}>
            <Text style={styles.subscriptiontext}>Start Subscription</Text>
            <Image source={Images.rightarrow} style={styles.rightarrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sharecontainer} onPress={copyToClipboard}>
            <Image source={Images.shareIcon} style={styles.share} />
          </TouchableOpacity>
        </View>

        {/* WIP */}
        {/* <Text style={{ color: 'white', textAlign: 'center' }}>Yha pr video wala component aajayega.</Text> */}

        {/* <Video
        source={background}
        ref={videoRef}
        // onBuffer={onBuffer}
        // onError={onError}
        style={styles.backgroundVideo}
      /> */}

        <View style={styles.tagscontainer}>
          <Text style={styles.ai}>🤖  Artificial Intelligence</Text>
          <Text style={styles.bd}>🔄  Big Data</Text>
          <Text style={styles.wd}>💻  Web Development</Text>
          <Text style={styles.ds}>📊  Data Science</Text>
          <Text style={styles.ds2}>📈  Data Science</Text>
        </View>

        <Text style={styles.euronnetflix}>Euron Plus is the Netflix of upskilling, offering unlimited licenses with a highly affordable subscription. Gain access to free and paid live classes, self-paced courses, industry-ready projects, books, and 24/7 support through Euron Assist.</Text>
        <Text style={styles.whatyouwillget}>What You Will Get.</Text>
        <Text style={styles.vastocean}>It's a vast ocean of upskilling opportunities, providing everything your team needs to thrive. With comprehensive access to all essential resources, you'll empower your people to reach new heights in their professional journey.</Text>



        <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>iskey neechey toh poora ui hai, ye toh ho hi jayega </Text>
      </ScrollView>

    </SafeAreaView>

  );
};

export default EuronPlus;

const styles = StyleSheet.create({
  scrollview: {
    // padding: 10,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: '#050B0B',
  },
  welcometoeuron: {
    color: '#0A99AC',
    textAlign: 'center',
    fontSize: moderateScale(28),
    fontWeight: '700',
    marginVertical: moderateScale(20),
  },
  accesseuron: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(25),
    fontWeight: '600',
    width: moderateScale(350),
    alignSelf: 'center',
    // borderWidth:1,
    // borderColor:'red'
  },
  price: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(25),
    fontWeight: '600',
  },
  subscriptionbutton: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#0A99AC',
    borderRadius: moderateScale(18),
    padding: moderateScale(12),
    justifyContent: 'center',
    gap: 10,
  },
  subscriptiontext: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: moderateScale(15),
  },
  rightarrow: {

  },
  startingat: {
    fontSize: moderateScale(18),
  },
  subscriptionbuttoncontainer: {
    marginTop: moderateScale(30),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(15),
    alignSelf: 'center',
  },
  share: {
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  sharecontainer: {
    backgroundColor: '#223838',
    borderRadius: 100,
    padding: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    height: 200,
    width: 200,
  },
  tagscontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(50),
  },
  ai: {
    color: '#34D399',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    margin: moderateScale(10),
  },
  bd: {
    color: '#5FA5F9',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    margin: moderateScale(10),
  },
  wd: {
    color: '#F5C815',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    margin: moderateScale(10),

  },
  ds: {
    color: '#FB923C',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    margin: moderateScale(10),

  },
  ds2: {
    color: '#C084FC',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    margin: moderateScale(10),
  },
  euronnetflix: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: moderateScale(23),
    alignSelf: 'center',
    width: moderateScale(320),

  },
  whatyouwillget: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: moderateScale(30),
    fontWeight: '700',
    marginTop: moderateScale(25)
  },
  vastocean: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: moderateScale(18),
    marginTop: moderateScale(10),
    width: moderateScale(300),
    alignSelf: 'center'
  }

});
