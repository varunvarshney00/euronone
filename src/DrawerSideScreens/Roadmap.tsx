import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/HomeScreen/Header'
import Footer from '../components/HomeScreen/Footer'
import SearchBar from '../components/SearchBar/SearchBar'
import Data from '../components/Roadmap/Data'

const Roadmap = () => {
  const[searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header user={null} />
      <ScrollView>
        <SearchBar onSearch={setSearchQuery} />
        <Data searchQuery={searchQuery} />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Roadmap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040E12'
  },
})