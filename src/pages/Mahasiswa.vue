<template>
    <div>
      <h3 class="font-serif font-semibold text-3xl pt-5">Data Mahasiswa</h3>
      <div class="">
        <uploadProfile @update-data="handleDataUpdate"></uploadProfile>
      </div>
      <div class="pl-8 pr-8">
        <div class="overflow-x-auto">
          <table class="border border-collapse border-black table-auto bg-white">
            <thead>
                <tr class="bg-blue-500 text-white m-5">
  <!-- <th class="border border-black w-1/6 pt-2 pb-2">Foto</th> -->
                <th class="border border-black w-1/8  pt-2 pb-2">NIM</th>
                <th class="border border-black w-1/2">Nama</th>
                <th class="border border-black w-1/6">Email</th>
                <th class="border border-black w-1/2">Alamat</th>
                <th class="border border-black w-1/2">Action</th>
                </tr>

            </thead>
            <tbody>
              <tr v-for="(mahasiswa, index) in mahasiswas" :key="mahasiswa._id">
                <!-- <td class="border border-black py-2 px-2">
                <div class="flex justify-center items-center h-full">
                    <img :src="mahasiswa.imageName" class="rounded-full object-contain h-20 w-20 block"
                        id="foto" alt="foto" />
                </div>
              </td> -->
                <td class="border border-black py-2 px-2 text-center">{{ mahasiswa.NIM }}</td>
                <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.Nama }}</td>
                <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.email }}</td>
                <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.alamat }}</td>
                <td class="border border-black py-2 px-2 text-center">
                  <div class="flex justify-center space-x-2">
                    <Button label="Edit" class="bg-blue-500 text-white" @click="showEditDialog(index)" raised outlined />
                    <Button label="Hapus" @click="showDeleteConfirmation(index)" class="bg-red-500 text-white"/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- eslint-disable-next-line vue/no-unused-components -->
          <Dialog v-model:visible="editingDialogVisible" modal header="Edit Data" :style="{ width: '50vw' }">
            <form @submit.prevent="updateData">
              <div class="mb-4">
                <label for="nim" class="block font-semibold mb-2">NIM:</label>
                <InputNumber placeholder="NIM" v-model="selectedMahasiswa.NIM" inputId="withoutgrouping"
                    :useGrouping="false" disabled class="w-full" id="nim" />
              </div>
              <div class="mb-4">
                <label for="nama" class="block font-semibold mb-2">Nama:</label>
                <InputText id="nama" v-model="selectedMahasiswa.Nama" class="w-full" />
              </div>
              <div class="mb-4">
                <label for="email" class="block font-semibold mb-2">Email:</label>
                <InputText placeholder="example@gmail.com" id="email" v-model="selectedMahasiswa.email"
                    class="w-full" />
              </div>
              <div class="mb-4">
                <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                <InputText id="alamat" v-model="selectedMahasiswa.alamat" class="w-full" />
              </div>
              <div class="text-center">
                <Button label="Update" type="submit"
                  class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded select-none"
                  severity="success" />
              </div>
            </form>
          </Dialog>
  
          <!-- eslint-disable-next-line vue/no-unused-components -->
          <Dialog v-model:visible="visible" modal header="Hapus Data" :style="{ width: '400px' }">
            <p>Anda yakin ingin menghapus data ini?</p>
            <div class="flex justify-end space-x-4 pt-6">
              <Button label="Tidak" class="p-button-text text-gray-500" @click="visible = false" />
              <Button label="Iya" class="p-button-danger" @click="deletePost" />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  </template>
  
  
  

<script>
import axios from 'axios';
import uploadProfile from '../components/uploadProfile.vue';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';

export default {
    components: {
        uploadProfile,
        Button,
        Dialog,
        InputNumber,
    },
    data() {
        return {
            nim: null,
            nama: '',
            email: '',
            alamat: '',
            mahasiswas: [],

            visible: false,
            editingDialogVisible: false,
            deleteDialogVisible: false,
            deletingIndex: null,
            editingIndex: null,

            selectedMahasiswa: {
                _id: '',
                NIM: null,
                Nama: '',
                email: '',
                alamat: '',
            },
        };
    },

    setup() {
        const toast = useToast();
        const success = (Message, summary) => {
            toast.add({ severity: 'success', summary: summary, detail: Message, life: 5000 });
        };

        const warn = (Message, summary) => {
            toast.add({ severity: 'warn', summary: summary, detail: Message, life: 5000 });
        };

        const error = (Message, summary) => {
            toast.add({ severity: 'error', summary: summary, detail: Message, life: 5000 });
        };

        return {
            success,
            warn,
            error,

        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        handleDataUpdate() {
            this.fetchData();
        },

        fetchData() {
            const token = localStorage.getItem('token');

            // Include the token in the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios.get('https://backend-blue-nine-65.vercel.app/mahasiswa', config)
                .then((response) => {
                    this.mahasiswas = response.data;
                    this.sortPostsByNIM(); // Sort the posts array by NIY
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        sortPostsByNIM() {
            this.mahasiswas.sort((a, b) => a.NIM - b.NIM);
        },

        showDeleteConfirmation(index) {
            this.deletingIndex = index;
            this.visible = true;
        },

        async deletePost() {
            try {
                const token = localStorage.getItem('token');

                // Include the token in the Authorization header
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const id = this.mahasiswas[this.deletingIndex]._id;
                const apiEndpoint = `https://backend-blue-nine-65.vercel.app/mahasiswa/${id}`;
                await axios.delete(apiEndpoint, config);
                this.mahasiswas.splice(this.deletingIndex, 1);
                this.success('Data berhasil dihapus', 'Success Message');
            } catch (error) {
                const errorMessage = error.response.data.message;
                this.error(errorMessage);
            } finally {
                this.visible = false;
                this.deletingIndex = null;
            }
        },

        showEditDialog(index) {
            this.selectedMahasiswa = { ...this.mahasiswas[index] };
            this.editingIndex = index;
            this.editingDialogVisible = true;
        },

        validateEmail(email) {
            // Regular expression to validate email format
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        },

        async updateData() {
            if (!this.selectedMahasiswa.NIM || !this.selectedMahasiswa.Nama || !this.selectedMahasiswa.email || !this.selectedMahasiswa.alamat) {
                this.warn('Data tidak boleh kosong', 'Alert Message');
                return;
            }

            if (!this.validateEmail(this.selectedMahasiswa.email)) {
                this.warn('Email tidak valid', 'Alert Message');
                return;
            }
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const id = this.mahasiswas[this.editingIndex]._id;
                const apiEndpoint = `https://backend-blue-nine-65.vercel.app/mahasiswa/${id}`;
                await axios.put(apiEndpoint, this.selectedMahasiswa, config);
                this.mahasiswas[this.editingIndex] = { ...this.selectedMahasiswa };
                this.editingDialogVisible = false;
                this.success('Data berhasil diupdate', 'Success Message');
            } catch (error) {
                const errorMessage = error.response.data.message;
                this.error("Data Gagal Diubah : "+ errorMessage, 'Error Message');
                this.editingDialogVisible = false;
            }
        },




    },
};
</script>

<style>
</style>
