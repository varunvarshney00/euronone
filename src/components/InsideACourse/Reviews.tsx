import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Reviews = () => {
  return (
    <View>
      <Text style={styles.studentsfeedback}>Students Feedback</Text>
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
    studentsfeedback:{
        color:'#fff'
    }
})