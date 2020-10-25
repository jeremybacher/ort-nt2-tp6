<template>
  <section class="age-field">
    <div class="form-group">
      <label for="age">Age</label>
      <input 
          type="number"
          id="Age"
          class="form-control"
          :value="age.$model"
          @input="onChangeAge($event.target.value)"
      >
      <div v-if="age.$error && age.$dirty" class="alert alert-danger mt-1">
        <div v-if="age.required.$invalid">{{ age.required.$message }}</div>
        <div v-else-if="age.between.$invalid">{{ age.between.$message }}</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default  {
    name: 'age-field',
    props: ['age', 'onAge'],
    methods: {
      onChangeAge(value) {
        this.$emit('age', value)
      }
    }
  }
</script>
