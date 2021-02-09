new Vue({
    el: '.auth-shit',

    data: {
        email: '',
        password: '',
        authUser: null
    },

    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => (window.location = '/dashboard'))
                .catch(error => alert(error.message));
        },

        signIn() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => (window.location = '/dashboard'))
                .catch(error => alert(error.message));
        },

        signInWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .catch(error => alert(error.message))
                .then(() => (window.location = '/dashboard'))
                .then(data => console.log(data.user, data.credentials.accessToken));
        },

        signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => (window.location = '/login'))
                .catch(error => alert(error.message));
        },

        resetPassword() {
            firebase
                .auth()
                .sendPasswordResetEmail(this.email)
                .then(() => (window.location = '/login'))
                .catch(error => alert(error.message));
        }
    },
    computed: {
        timeOfDay() {
            let currentTime = new Date();
            currentTime.toLocaleTimeString('en-US');

            return currentTime;
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.authUser = user;
        });
    }
});
