import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from '../../assets'
import { vh, vw } from '../../constants/Dimensions'

const Footer = () => {
    return (
        <View style={styles.container}>

            <Image source={Images.mainLogo} style={styles.mainlogo} />

            <View style={styles.contactcontainer}>
                <Image source={Images.email} style={styles.email} />
                <Text style={styles.contacteuron}>contact@euron.one</Text>
            </View>

            <View style={styles.contactcontainer}>
                <Image source={Images.map} style={styles.map} />
                <Text style={styles.address}>Bengaluru, Karnataka, 560049</Text>
            </View>

            <View style={styles.socialmediacontainer}>
                <Image source={Images.instagram} style={styles.commonicon} />
                <Image source={Images.youtube} style={styles.commonicon} />
                <Image source={Images.linkedin} style={styles.commonicon} />
            </View>

            <Text style={styles.companytext}>Company</Text>

            <View style={{ borderWidth: 1.7, borderColor: '#12363C', width: vw(147), marginTop: 18, borderRadius: 8 }} />

            <View style={styles.tworowcontainer}>
                <View style={{ gap: 32 }}>
                    <Text style={styles.commontext}>About us</Text>
                    <Text style={styles.commontext}>Privacy policy</Text>
                    <Text style={styles.commontext}>Terms and conditions</Text>

                </View>

                <View style={{ gap: 32, marginRight: vw(35) }}>
                    <Text style={styles.commontext}>FAQs</Text>
                    <Text style={styles.commontext}>Contact us</Text>
                    <Text style={styles.commontext}>Founder's Story</Text>

                </View>
            </View>

        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    commontext: {
        color: 'white'
    },
    tworowcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vh(30)
    },
    companytext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 23,
        marginTop: vh(45)
    },
    socialmediacontainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',

    },
    contactcontainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginBottom: vh(30)
    },
    container: {
        backgroundColor: '#141E22',
        padding: 20,
        paddingVertical: 40,
        flex:2,
        width:"100%",
        marginTop:vh(12)
    },
    contacteuron: {
        color: '#C1C4C9'
    },
    address: {
        color: '#C1C4C9'
    },
    mainlogo: {
        tintColor: 'white',
        height: vh(44),
        width: vw(113),
        resizeMode: 'contain',
        marginBottom: vh(50)
    },
    email: {
        tintColor: '#C1C4C9',
        resizeMode: 'contain',
        height: vh(20),
        width: vw(20)
    },
    map: {
        tintColor: '#C1C4C9',
        resizeMode: 'contain',
        height: vh(20),
        width: vw(20)
    },
    commonicon: {
        tintColor: '#C1C4C9',
        resizeMode: 'contain',
        height: vh(30),
        width: vw(30)
    }


})