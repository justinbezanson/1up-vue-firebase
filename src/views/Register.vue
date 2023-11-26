<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
                Sign Up For An Account
            </div>

            <div class="text-red-800 bg-red-200 p-2 border border-red-300 rounded-md mt-4" v-if="errorMessage">
                {{ errorMessage }}
            </div>

            <button @click="signInWithGoogle"
                class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i
                        class="fab fa-google"></i></span>
                <span>Continue with Google</span>
            </button>

            <div class="relative mt-10 h-px bg-gray-300">
                <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span class="bg-white px-4 text-xs text-gray-500 uppercase">Or Sign Up With Email</span>
                </div>
            </div>

            <div class="mt-10">
                <form action="#">
                    <div class="flex flex-col mb-6">
                        <label for="email" class="text-left mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail
                            Address:</label>

                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>

                            <input v-model="email" id="email" type="email" name="email"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="E-Mail Address" />
                        </div>
                    </div>

                    <div class="flex flex-col mb-6">
                        <label for="display_name"
                            class="text-left mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Display Name:</label>

                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" width="24px" height="24px">
                                    <circle cx="12" cy="8" fill="currentColor" r="4" />
                                    <path d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z"
                                        fill="currentColor" />
                                </svg>
                            </div>

                            <input v-model="displayName" id="dsiplay_name" type="text" name="display_name"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Display Name" />
                        </div>
                    </div>

                    <div class="flex flex-col mb-6">
                        <label for="password"
                            class="text-left mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>

                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                            </div>

                            <input v-model="password" id="password" type="password" name="password"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div class="flex flex-col mb-6">
                        <label for="confirm_password"
                            class="text-left mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Confirm Password:</label>

                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                            </div>

                            <input v-model="confirmPassword" id="confirm_password" type="password" name="confirm_password"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Confirm Password" />
                        </div>
                    </div>

                    <div class="flex w-full">
                        <button @click="register" type="button"
                            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                            <span class="mr-2 uppercase">Create Account</span>
                            <span>
                                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const displayName = ref('');
const errorMessage = ref('');

const register = () => {
    const auth = getAuth();

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Password and confirm password do not match';
        return;
    }

    if (email.value.length < 1) {
        errorMessage.value = 'Email cannot be empty';
        return;
    }

    if (displayName.value.length < 1) {
        errorMessage.value = 'Display name cannot be empty';
        return;
    }

    if (password.value.length < 1) {
        errorMessage.value = 'Password cannot be empty';
        return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((result) => {
            return updateProfile(auth.currentUser, {
                displayName: displayName.value
            })
            .then((result) => {
                console.log('Registered successfully');
                console.log(auth.currentUser);
                router.push('/feed');
            });
        })
        .catch((error) => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMessage.value = 'There is already an account using this email address';
                    break;
                default:
                    console.log(error.code);
                    errorMessage.value = 'Could not create account'
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