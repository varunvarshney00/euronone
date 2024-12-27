// DONE

// THIS IS THE FOOTER OF OUR APP

import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import { moderateScale } from 'react-native-size-matters';

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

            <View style={styles.contactcontainer}>
                <Image source={Images.call} style={styles.map} />
                <Text style={styles.address}>9019065931</Text>
            </View>

            <View style={styles.socialmediacontainer}>
                <Image source={Images.instagram} style={styles.commonicon} />
                <Image source={Images.youtube} style={styles.commonicon} />
                <Image source={Images.linkedin} style={styles.commonicon} />
            </View>

            <Text style={styles.companytext}>Company</Text>

            <View style={styles.companycontainer} />

            <View style={styles.tworowcontainer}>
                <View style={styles.containerAPT}>
                    <Text style={styles.commontext}>About us</Text>
                    <Text style={styles.commontext}>Privacy policy</Text>
                    <Text style={styles.commontext}>Terms and conditions</Text>

                </View>

                <View style={styles.containerFCF}>
                    <Text style={styles.commontext}>FAQs</Text>
                    <Text style={styles.commontext}>Contact us</Text>
                    <Text style={styles.commontext}>Founder's Story</Text>
                </View>
            </View>

        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141E22',
        padding: moderateScale(20),
        paddingVertical: moderateScale(40),
        flex: 1,
        width: '100%',
        marginTop: moderateScale(12),
    },
    mainlogo: {
        tintColor: 'white',
        height: moderateScale(44),
        width: moderateScale(113),
        resizeMode: 'contain',
        marginBottom: moderateScale(50),
    },
    commontext: {
        color: 'white',
    },
    tworowcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(30),
    },
    companytext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(23),
        marginTop: moderateScale(45),
    },
    socialmediacontainer: {
        flexDirection: 'row',
        gap: moderateScale(15),
        alignItems: 'center',
    },
    contactcontainer: {
        flexDirection: 'row',
        gap: moderateScale(8),
        alignItems: 'center',
        marginBottom: moderateScale(30),
    },
    contacteuron: {
        color: '#C1C4C9',
    },
    address: {
        color: '#C1C4C9',
    },
    email: {
        tintColor: '#C1C4C9',
        resizeMode: 'contain',
        height: moderateScale(20),
        width: moderateScale(20),
    },
    map: {
        tintColor: '#C1C4C9',
        resizeMode: 'contain',
        height: moderateScale(20),
        width: moderateScale(20),
    },
    commonicon: {
        tintColor: '#C1C4C9',
        resizeMode: 'contain',
        height: moderateScale(30),
        width: moderateScale(30),
    },
    containerFCF: {
        gap: moderateScale(32),
        marginRight: moderateScale(35),
    },
    containerAPT: {
        gap: moderateScale(32),
    },
    companycontainer: {
        borderWidth: 1.7,
        borderColor: '#12363C',
        width: moderateScale(147),
        marginTop: moderateScale(18),
        borderRadius: moderateScale(8),
    },

});
