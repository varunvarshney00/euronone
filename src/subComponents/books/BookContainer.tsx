import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf'

const BookContainer = () => {
  return (
    <View style={styles.container}>
      <Pdf scale ={1.0} page={40} spacing={10} style={styles.pdf} trustAllCerts={false} source={{ uri: "https://kvongcmehsanalibrary.wordpress.com/wp-content/uploads/2021/07/harrypotter.pdf" }} />
    </View>
  )
}

export default BookContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})