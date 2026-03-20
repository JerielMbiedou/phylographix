<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="upload-card">
      <v-card-title class="card-title">
        <v-icon class="icon">mdi-upload</v-icon>
        IMPORT DATASET
        <v-btn class="close-btn" icon @click="closeCard">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="card-text">
        Note: accepted file format is JSON
      </v-card-text>
      <v-form v-model="valid">
        <v-row align="center" justify="center">
          <v-col class="upload-col" cols="12" md="6" sm="8">
            <v-text-field v-model="fileName" label="File Name" readonly></v-text-field>
            <input ref="fileInput" style="display: none" type="file" @change="handleFileUpload">
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="button-col" cols="12" md="6" sm="8">
            <v-btn color="primary" @click="chooseFile">Choose File</v-btn>
            <v-btn :disabled="!fileName" class="upload-btn" color="primary" @click="uploadFile">
              <v-icon class="icon">mdi-folder-open</v-icon>
              Upload
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>


export default {
  data() {
    return {
      dialog: true,
      file: null,
      fileName: '',
    };
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    uploadFile() {
      if (!this.file) {
        toast.error("No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result);

        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(this.file);
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.fileName = this.file ? this.file.name : '';
    },
    closeCard() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.upload-card {
  background-color: #008CE1;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-text {
  color: white;
  text-align: center;
}

.icon {
  margin-right: 4px;
}

.close-btn {
  padding: 0;
}

.upload-col {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.button-col {
  display: flex;
  justify-content: center;
  align-items: center;

}

.upload-btn {
  margin-left: 8px;
}
</style>
  