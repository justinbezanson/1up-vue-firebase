<template>
    <h1>Create Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Create Account</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter} from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('Successfully signed in');
            console.log(auth.currentUser);
            router.push('/feed');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
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