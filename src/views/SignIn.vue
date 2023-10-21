<template>
    <h1>Log In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Log In</button></p>
    <p><button @click="signInWithGoogle">Log In With Google</button></p>
</template>