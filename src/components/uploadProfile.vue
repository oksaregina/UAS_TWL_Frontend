<template>
    <div class="justify-content-center text-left pl-8 pb-3">
      <div class="pt-3">
        <Button
        label="Tambah Data"
        class="p-button-success p-button-rounded p-py-2 p-px-4 p-mr-2"
        icon=""
        @click="visible = true"
        />

      </div>
      <Dialog
        v-model:visible="visible"
        @hide="handleDialogClose"
        modal
        :style="{ width: '50vw' }"
        class="p-dialog-sm"
      >
        <template #header>
          <h3 class="font-semibold">Tambah Data</h3>
        </template>
        <form @submit.prevent="uploadFile">
          <div class="mb-4">
            <label for="NIM" class="block font-semibold mb-2">NIM:</label>
            <InputNumber
              placeholder="NIM"
              v-model="NIM"
              inputId="withoutgrouping"
              :useGrouping="false"
              class="w-full"
              id="NIM"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="Nama" class="block font-semibold mb-2">Nama:</label>
            <InputText id="Nama" v-model="Nama" class="w-full" required />
          </div>
  
          <div class="mb-4">
            <label for="email" class="block font-semibold mb-2">Email:</label>
            <InputText
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              class="w-full"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
            <InputText id="alamat" v-model="alamat" class="w-full" required />
          </div>
  
          <div class="text-center">
            <Button
              label="Simpan"
              type="submit"
              class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded select-none"
              severity="success"
            />
            
          </div>
        </form>
      </Dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import { useToast } from 'primevue/usetoast';
  
  export default {
    name: 'uploadProfile',
  
    components: {
      Button,
      Dialog,
      InputText,
      InputNumber,
    },
  
    setup() {
      const visible = ref(false);
      const toast = useToast();
  
      const success = (message, summary) => {
        toast.add({
          severity: 'success',
          summary: summary,
          detail: message,
          life: 5000,
        });
      };
  
      const warn = (message, summary) => {
        toast.add({
          severity: 'warn',
          summary: summary,
          detail: message,
          life: 5000,
        });
      };
  
      const error = (message, summary) => {
        toast.add({
          severity: 'error',
          summary: summary,
          detail: message,
          life: 5000,
        });
      };
  
      return {
        visible,
        success,
        warn,
        error,
      };
    },
  
    data() {
      return {
        NIM: null,
        Nama: '',
        email: '',
        alamat: '',
      };
    },
  
    methods: {
      handleDialogClose() {
        this.visible = false;
      },
  
      validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      },
  
      async uploadFile() {
        if (!this.NIM || !this.Nama || !this.email || !this.alamat) {
          this.warn('Data tidak boleh kosong', 'Pesan Peringatan');
          return;
        }
  
        if (!this.validateEmail(this.email)) {
          this.warn('Email tidak valid', 'Pesan Peringatan');
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
  
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          const { NIM, Nama, email, alamat } = this;
          const data = { NIM, Nama, email, alamat };
  
          await axios.post('https://backend-blue-nine-65.vercel.app/mahasiswa', data, config);
  
          this.success('Data berhasil ditambahkan', 'Pesan Sukses');
          this.handleDialogClose();
          window.location.reload();
        } catch (error) {
          const errorMessage = error.response.data.message;
          this.error('Data Gagal Ditambahkan: ' + errorMessage, 'Pesan Kesalahan');
        }
      },
    },
  };
  </script>
  
  <style></style>
  