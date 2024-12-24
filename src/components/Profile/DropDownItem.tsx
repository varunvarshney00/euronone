import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Images } from '../../assets';

const DropDownItem = ({ label }) => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [menuShown, setMenuShown] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    

    const handleOnPress = () => {
        setSelectedItem(label);
        setMenuShown(!menuShown);
    };

    return (
        <View>
            <TouchableOpacity style={[styles.container, menuShown && { backgroundColor: '#1F2937' }]} onPress={handleOnPress}>
                <Text style={styles.labelstyle}>{label}</Text>
                <Image source={Images.downarrow} style={styles.downarrow} />
            </TouchableOpacity>

            {selectedItem === 'Profile' && menuShown ? (
                <View style={styles.profilecontainer}>
                    <Text style={styles.profiletext}>Profile</Text>

                    <Text style={styles.heading}>First Name</Text>
                    <TextInput
                        placeholder="Enter your first name"
                        style={styles.textinput}
                        placeholderTextColor="#9BA3AF"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Text style={styles.heading}>Last Name</Text>
                    <TextInput
                        placeholder="Enter your last name"
                        style={styles.textinput}
                        placeholderTextColor="#9BA3AF"
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    <Text style={styles.heading}>Phone Number</Text>
                    <TextInput
                        placeholder="Enter your phone number"
                        style={styles.textinput}
                        placeholderTextColor="#9BA3AF"
                    />

                    <Text style={styles.heading}>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        style={styles.textinput}
                        placeholderTextColor="#9BA3AF"
                    />

                    <Text style={styles.heading}>Gender</Text>
                    <TouchableOpacity style={styles.gendercontainer}>
                        <Text style={styles.gendertext}>Select Gender</Text>
                        <Image source={Images.downarrow} style={styles.downarrow} />
                    </TouchableOpacity>

                    <Text style={styles.heading}>About</Text>
                    <TextInput
                        placeholder="Something about you"
                        style={styles.textinput}
                        placeholderTextColor="#9BA3AF"
                    />
                </View>
            ) : (
                selectedItem === 'Settings' && menuShown ? (
                    <View>
                        <Text style={{ color: 'white' }}>
                            varun
                        </Text>
                    </View>
                ) : (
                    selectedItem === 'Invoice' && menuShown ? (
                        <View>
                            <Text style={{ color: 'white' }}>
                                varun
                            </Text>
                        </View>
                    ) : (
                        selectedItem === 'Euron Org' && menuShown ? (
                            <View style={styles.euronorgcontainer}>
                                <Text style={styles.limited}>Limited Access</Text>
                                <Text style={styles.donthaveaccess}>You don't have admin access. You have joined as a member.</Text>
                                <View style={styles.visitcontainer}>
                                    <Text style={styles.visit}>Visit Euron Org.</Text>
                                </View>
                            </View>
                        ) : (
                            null
                        )
                    )
                )
            )
            }
        </View>

    );
};

export default DropDownItem;

const styles = StyleSheet.create({
    visitcontainer: {
        backgroundColor: '#0D747C'
    },
    visit: {
        color: 'white',
    },
    donthaveaccess: {
        color: '#D1D5DA',
        textAlign: 'center'
    },
    limited: {
        fontWeight: '800',
        color: 'white',
        fontSize: 22
    },
    euronorgcontainer: {
        borderWidth: 1,
        borderColor: '#202829',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: moderateScale(100),
        borderRadius: moderateScale(10),
    },
    container: {
        borderWidth: 1,
        borderColor: '#202829',
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    labelstyle: {
        color: 'white',
        fontSize: moderateScale(17),
        fontWeight: '700',
    },
    downarrow: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: 'white',
    },
    profilecontainer: {
        borderWidth: 1,
        borderColor: '#202829',
        borderRadius: moderateScale(10),
        padding: moderateScale(14),
    },
    profiletext: {
        color: 'white',
        fontWeight: '700',
        fontSize: moderateScale(28),
    },
    heading: {
        color: 'white',
        fontWeight: '700',
        fontSize: moderateScale(15),
        marginTop: moderateScale(14),
    },
    textinput: {
        fontSize: moderateScale(20),
        borderWidth: 1,
        borderColor: '#202829',
        padding: moderateScale(11),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(10),
        color: 'white',
    },
    gendercontainer: {
        borderWidth: 1,
        borderColor: '#202829',
        padding: moderateScale(11),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    gendertext: {
        color: 'white',
        fontSize: moderateScale(20),
        fontWeight: '500',
    },
});
