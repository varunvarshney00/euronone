import { Image, StyleSheet, Text, View } from 'react-native';
import { vh, vw } from '../../constants/Dimensions';
import React, { useState, useEffect } from 'react';
import { Images } from '../../assets';





const GoodMorning = () => {



  const texts = [
    'Quantum computing harnesses the power of superposition to perform calculations exponentially faster than classical computers, promising transformative advances in fields like drug discovery and materials science.',
    'Quantum computing is poised to revolutionize everything from drug discovery to materials science, with its potential to solve problems exponentially faster than classical computers.',
    'GPT-4, the latest advancement in AI language models, generates impressively coherent and human-like text, pushing the boundaries of natural language processing and expanding its real-world applications.',
    'Quantum computing is rapidly evolving, with potential to revolutionize drug discovery, materials science, and economic modeling by enabling exponentially faster processing speeds.',
  ];




  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [containerHeight, setContainerHeight] = useState(vh(100));





  useEffect(() => {
    setDisplayedText('');
    setLetterIndex(0);
    setShowCursor(false);
  }, [textIndex]);





  useEffect(() => {

    const intervalId = setInterval(() => {
      if (letterIndex < texts[textIndex].length) {
        setDisplayedText((prev) => prev + texts[textIndex][letterIndex]);
        setLetterIndex((prev) => prev + 1);
      }
      else {
        clearInterval(intervalId);
        setShowCursor(true);
        setTimeout(() => {
          setShowCursor(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [textIndex, letterIndex]);




  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 5000);
      return () => clearInterval(cursorInterval);
    }
  },);

  const handleTextLayout = (event) => {
    const {height} = event.nativeEvent.layout;
    setContainerHeight(vw(135) + height + 20);
  };



  return (
    <View style={[styles.container, {height: containerHeight}]}>
      <Text style={styles.goodevening}>
        Good Evening
      </Text>
      <Text style={styles.goodevening}>
        Varun !
      </Text>

      <Text style={styles.typingText} onLayout={handleTextLayout}>
        {displayedText}
        {showCursor &&
          <Text style={styles.cursor}>|</Text>
        }
      </Text>

      <View style={styles.partnership}>
        <Text style={styles.textexplore}>
          Explore Partnership
        </Text>

        <View style={styles.exploreicon}>
          <Image source={Images.arrowUpperRight} style={styles.arrowicon}/>
        </View>
      </View>

    </View>
  );
};

export default GoodMorning;

const styles = StyleSheet.create({
  container: {
    height: vh(293),
    marginTop: vh(20),
    borderRadius: vw(20),
    backgroundColor: '#1F5F69',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  goodevening: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  typingText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    lineHeight:25,
  },
  cursor: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  partnership:{
    width:vw(190),
    height:vh(50),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    backgroundColor:'#20383F',
    flexDirection:'row',
    gap:vw(7),
    marginTop:20,
  },
  textexplore:{
    color:'white',
    fontWeight:'800',
    fontSize:15,
  },
  exploreicon:{
    backgroundColor:'#071D1F',
    borderRadius:100,
    height:vh(26),
    width:vh(26),
    alignItems:'center',
    justifyContent:'center',
  },
  arrowicon:{
    height:vh(10),
    width:vh(10),
    resizeMode:'contain',
    tintColor:'white',
  },
});
