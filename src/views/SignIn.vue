<template>
    <h1>Log In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="register">Log In</button></p>
    <p><button @click="signInWithGoogle">Log In With Google</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter} from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const register = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('Successfully signed in');
            console.log(auth.currentUser);
            router.push('/feed');
        })
        .catch((error) => {
            console.log(error.code);
            switch(error.code) {
                case 'auth/invalid-email':
                    errorMessage.value = 'Invalid email';
                    break;
                case 'auth/user-not-found':
                    errorMessage.value = 'No account with that email was found';
                    break;
                case 'auth/wrong-password':
                    errorMessage.value = 'Incorrect password';
                    break;
                default:
                    errorMessage.value = 'Email or password was incorrect';
                    break;
            }
        });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push('/feed');
        })
        .catch((error) => {

        });
};

</script>