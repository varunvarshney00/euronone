import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from '@env';
// import { setAuthState, setError } from '../redux/authSlice';

import {
    GoogleSignin,
    // GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

export async function onGoogleButtonPress() {
    try {

        // Validate WEB_CLIENT_ID
        if (!WEB_CLIENT_ID) {
            throw new Error('WEB_CLIENT_ID is missing. Please check your environment variables.');
        }

        // Configure Google Sign-In
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
        });

        // Check for Play Services
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Sign in with Google
        const response = await GoogleSignin.signIn();

        // Validate response
        if (!response?.data?.idToken) {
            throw new Error('Google Sign-In failed: idToken is missing.');
        }

        // Get Google credential
        const googleCredential = auth.GoogleAuthProvider.credential(response?.data?.idToken);

        // Sign in with Firebase
        return await auth().signInWithCredential(googleCredential);

    } catch (error) {
        // Handle errors
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the Google Sign-In process.');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Google Sign-In is already in progress.');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services not available or outdated.');
        } else {
            console.error('An unexpected error occurred:', error.message);
        }

        throw error; // Re-throw the error for further handling
    }
}