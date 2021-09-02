export const uiConfig = firebase => {
    return {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        tosUrl: '/terms-of-service',
        privacyPolicyUrl: '/privacy-policy',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ]
    }
}
