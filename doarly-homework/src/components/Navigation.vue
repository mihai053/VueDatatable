<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">Homework</router-link>
    </div>
    <div class="products">
      <router-link to="/products">Produse</router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: #0c2f6b;
}

.logo {
  font-size: 1rem;
  font-family: "Fira", sans-serif;
  height: 100%;
  display: flex;
  width: 35%;
  justify-content: flex-start;
  align-items: center;
  color: #94fdfd;
}
.products {
  display: flex;
  justify-content: flex-end;
  gap: 5%;
  font-family: "Fira", sans-serif;
  align-items: center;
  width: 55%;
  height: 100%;
  font-size: 2rem;
}
.logo a {
  text-decoration: none;
  color: #94fdfd;
}
.products a {
  text-decoration: none;
  color: #94fdfd;
}

.button {
  background: inherit;
  border: none;
  color: #94fdfd;
  font-size: 1.5rem;
  cursor: pointer;
}
@media (min-width: 768px) {
  .logo {
    font-size: 2.5rem;
  }
  .products a {
    font-size: 1.5rem;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script>
import ProductModal from "./ProductModal.vue";

export default {
  components: { ProductModal },
};
</script>
