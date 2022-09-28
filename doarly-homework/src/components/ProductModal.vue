<template>
  <form class="form-modal" @submit.prevent="onSubmitHanler">
    <h2 class="title">{{ title }}</h2>
    <div class="wrapper">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="name"
        placeholder="Name"
      />

      <label for="code">Code</label>
      <input
        type="text"
        id="code"
        name="code"
        v-model="code"
        placeholder="Code"
      />

      <label for="weight">Weight (kg)</label>
      <input
        type="number"
        id="weight"
        name="weight"
        v-model="weight"
        placeholder="Weight"
        min="0"
      />

      <label for="price">Price (lei)</label>
      <input
        type="number"
        id="price"
        name="price"
        v-model="price"
        placeholder="Price"
        min="0"
      />

      <label for="color">Color</label>
      <input
        type="text"
        id="color"
        name="color"
        v-model="color"
        placeholder="Color"
      />
    </div>
    <div class="button-wrapper">
      <button class="btn" type="submit">{{ buttonText }}</button>
      <button class="btn" v-on:click="onCloseChild">Close</button>
    </div>
  </form>
</template>

<style scoped>
.form-modal {
  background: whitesmoke;
  position: fixed;
  z-index: 999;
  top: 15%;
  left: 50%;
  width: 350px;
  margin-left: -150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 5px;
}
.wrapper input {
  width: 280px;
  height: 30px;
  border-radius: 15px;
  border: none;
  text-indent: 8px;
}
.button-wrapper {
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 17%;
}
.title {
  padding-top: 20px;
  color: #02457a;
}
.btn {
  width: 100px;
  height: 30px;
  background: white;
  border-radius: 15px;
  border: 0.5px solid #02457a;
}
.btn:hover {
  cursor: pointer;
  transition: ease-in 0.6;
  background: #02457a;
  border: none;
  color: white;
}
</style>

<script>
export default {
  props: {
    close: Function,
    update: Function,
    title: String,
    buttonText: String,
    added: Boolean,
    edit: Boolean,
    nume: String,
    cod: String,
    greutate: Number,
    pret: Number,
    culoare: String,
    tip: Boolean,
    id: String,
  },
  data() {
    return {
      name: this.nume ? this.nume : "",
      code: this.cod ? this.cod : "",
      weight: this.greutate ? this.greutate : "",
      price: this.pret ? this.pret : "",
      color: this.culoare ? this.culoare : "",
    };
    // loading spinner state todo
  },
  components: {
    //we must pass the component to export in order to use in template tag
  },
  methods: {
    async onSubmitHanler() {
      // todo frontend validation
      const data = {
        name: this.name,
        code: this.code,
        weight: Number(this.weight),
        price: Number(this.price),
        color: this.color,
        isDeleted: false,
      };
      try {
        const response = await fetch(
          `http://localhost:5001/products/${this.tip ? this.id : ""}`,
          {
            method: this.tip ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        // const responseMessage = await response.json();
      } catch (error) {
        console.log("The request failed!", error);
      }

      this.name = "";
      this.code = "";
      this.weight = "";
      this.price = "";
      this.color = "";
      this.update();
      this.close();
    },
    onCloseChild() {
      // resent input fields when we close the modal
      this.name = "";
      this.code = "";
      this.weight = "";
      this.price = "";
      this.color = "";
      this.close();
    },
  },
};
</script>
