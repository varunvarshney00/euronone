import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from 'react-native-size-matters'
import { courseList } from '../../utils/dummyData'
import {
  Pressable,
  SafeAreaView,
  Button,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


const Lectures = ({ passedTitle }) => {

    const matchedCourse = courseList.find(course => course.courseName === passedTitle);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Course Content</Text>

            {matchedCourse ? (
                <View>
                    {matchedCourse.topics && matchedCourse.topics.length > 0 ? (
                        matchedCourse.topics.map((topic, topicIndex) => (
                            <View>
                                <Text style={styles.topicname}>{topic.topicName}</Text>

                                {topic.lectures && topic.lectures.length > 0 ? (
                                    topic.lectures.map((lecture, lectureIndex) => (
                                        <View style={styles.lecturescontainer}>
                                            <Text style={styles.lecturename}>{lecture.lectureName}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No lectures available.</Text>
                                )}
                            </View>

                        ))
                    ) : (
                        <Text>No topics available.</Text>
                    )}
                </View>
            ) : (
                <View>
                    <Text style={{ color: 'white' }}>no course</Text>
                </View >

            )}
        </View >
    )
}

export default Lectures

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: '800',
        fontSize: moderateScale(18),
        marginBottom:moderateScale(13)
    },
    container: {
        padding: moderateScale(20),
        paddingTop: moderateScale(30)
    },
    topicname: {
        color: '#6F6F6F',
        fontSize: moderateScale(18.6),
        fontWeight: '500',
        marginTop: moderateScale(20)
    },
    lecturename:{
        color:'#fff',
        fontWeight:'500'
    },
    lecturescontainer:{
        padding:moderateScale(20),
        borderBottomWidth:2,
        borderColor:"#2C2C2F"
    }
})