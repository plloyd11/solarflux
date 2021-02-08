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
            firebase.auth().signInWithPopup(provider);
        },

        signOut() {
            firebase.auth().signOut();
        }
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.authUser = user;
        });
    }
});
