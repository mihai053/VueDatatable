<template>
  <main class="main">
    <div class="wrapper">
      <h1>Products Table</h1>
      <div class="add-product-section">
        <p>Please add a product for this table 🙂</p>
        <button class="btn-add" v-on:click="onAddHandler">Add Product</button>
      </div>
    </div>
    <div class="table">
      <EasyDataTable :headers="headers" :items="items" border-cell>
        >
        <template #item-operations="item">
          <button class="btn" v-on:click="onEditHandler(item)">Edit</button>
          <button class="btn-delete" v-on:click="onDeleteHanlder(item)">
            Delete
          </button>
        </template>
      </EasyDataTable>
    </div>
  </main>
  <Teleport v-if="modalState === true" to="body">
    <ProductModal
      v-if="edit === true"
      title="Edit Product"
      :close="onCloseEditHandler"
      :update="onUpdateHandler"
      buttonText="Edit Product"
      :id="parsedItem.id"
      :nume="parsedItem.name"
      :cod="parsedItem.code"
      :greutate="parsedItem.weight"
      :pret="parsedItem.price"
      :culoare="parsedItem.color"
      :tip="parsedItem.edit"
    />
    <ProductModal
      v-else
      :close="onCloseAddHandler"
      :update="onUpdateHandler"
      title="Add Product"
      buttonText="Add Product"
      :added="added"
    />
  </Teleport>
</template>

<style scoped>
.add-product-section {
  padding: 20px 0;
  display: flex;
  width: 100%;
  gap: 2%;
}
.add-product-section p {
  font-size: 20px;
  padding-left: 25px;
}

.main {
  display: flex;
  flex-direction: column;
}
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #0c2f6b;
  padding-top: 20px;
  padding-bottom: 20px;
  /* or make font globally */
}
.table {
  padding-left: 20px;
  padding-right: 20px;
}
.btn {
  height: 25px;
  width: 50px;
  margin-right: 30px;
  background: #2f5ba7;
  border: none;
  border-radius: 15px;
  color: white;
  cursor: pointer;
}

.btn-delete {
  height: 25px;
  width: 70px;
  background: #2f5ba7;
  border: none;
  border-radius: 15px;
  color: white;
  cursor: pointer;
}
.btn:hover {
  transition: ease-in 0.3;
  background: white;
  color: #2f5ba7;
  border: 1px solid #2f5ba7;
}
.btn-delete:hover {
  transition: ease-in 0.3;
  background: white;
  color: #2f5ba7;
  border: 1px solid #2f5ba7;
}
</style>

<script>
import ProductModal from "../components/ProductModal.vue";
export default {
  data() {
    const headers = [
      //header of the table
      { text: "Name", value: "name", sortable: true },
      { text: "Code", value: "code", sortable: true },
      { text: "Weight (kg)", value: "weight", sortable: true, width: 250 },
      { text: "Price (lei)", value: "price", sortable: true, width: 250 },
      { text: "Color", value: "color", sortable: true },
      { text: "Operations", value: "operations", width: 200 },
    ];

    return {
      update: false,
      headers,
      edit: false,
      added: false,
      items: [],
      parsedItem: {},
      modalState: false,
    };
  },
  methods: {
    onUpdateHandler() {
      this.update = true;
    },
    onAddHandler() {
      this.modalState = true;
      this.added = true;
    },
    onEditHandler(item) {
      this.modalState = true;
      this.edit = true;
      this.parsedItem = { ...item, edit: true };
    },
    onCloseEditHandler() {
      this.modalState = false;
      this.edit = false;
    },
    onCloseAddHandler() {
      this.modalState = false;
      this.added = false;
    },
    async onDeleteHanlder(item) {
      try {
        await fetch(`http://localhost:5001/products/${item.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log("Stergerea a esuat! ", error);
      }

      fetch("http://localhost:5001/products")
        .then((res) => res.json())
        .then((data) => (this.items = [...data]))
        .catch((err) =>
          console.log("Eroare la data fetching update ", err.message)
        );
    },
  },
  mounted() {
    //at first mount to the dom
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => (this.items = [...data]))
      .catch((err) => console.log("Eroare la data fetching", err.message));
  },
  updated() {
    //updated makes data fetching when we update
    //data from backend
    // like the dependecy array in react useeffect
    // console.log("from update");
    if (this.update) {
      fetch("http://localhost:5001/products")
        .then((res) => res.json())
        .then((data) => (this.items = [...data]))
        .catch((err) =>
          console.log("Eroare la data fetching update ", err.message)
        );
      this.update = false;
    }
  },
  components: { ProductModal },
};
</script>
