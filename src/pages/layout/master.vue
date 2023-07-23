<template>
  <div v-if="hasToken">
    <div v-if="tokenExpired()"></div>
    <div v-else>
      <headerTop :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
      <div class="w-full h-[calc(100vh-50px)] overflow-auto bg1">
        <sidebar></sidebar> <!-- Tambahkan tag komponen sidebar di sini -->
      
      </div>
    </div>
  </div>
  <div v-else>
    <Toast></Toast>
    <div class="flex justify-center items-center min-h-screen bg">
      <div class="bg-white p-8 rounded shadow-lg login-section">
        <template v-if="mode === 'login'">
          <LoginForm @switch-mode="switchMode" />
        </template>
        <template v-else-if="mode === 'registration'">
          <RegistrationForm @switch-mode="switchMode" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import headerTop from './../../components/header.vue'
import LoginForm from '../../components/loginForm.vue';
import RegistrationForm from '../../components/registrationForm.vue';

export default {
  components: {
    sidebar,
    headerTop,
    LoginForm,
    RegistrationForm,
  },

  setup() {
    const hasToken = localStorage.getItem('token')

    return {
      hasToken,
    }
  },

  data() {
    return {
      mode: 'login', // Initial mode is set to login
    }
  },
  methods: {
    tokenExpired() {
      const token = localStorage.getItem('token');
      const expirationDate = localStorage.getItem('expirationDate');

      if (!token || !expirationDate) {
        return true; // Token is expired if it doesn't exist or no expiration date
      }

      const now = new Date().getTime();
      const expiresAt = new Date(expirationDate).getTime();

      if (now > expiresAt) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        return true; // Token is expired
      }

      return false; // Token is not expired
    },

    switchMode(mode) {
      this.mode = mode;
    },
  }
}
</script>

<style scoped>

.login-section {
  width: 320px;
}
</style>
