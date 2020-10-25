<template>
  <section class="user-form">
    <div class="jumbotron">
      <h2>Create User</h2>
      <hr />
      <form novalidate autocomplete="off" @submit.prevent="create()">
        <!-- ------------ -->
        <!-- Name Field -->
        <!-- ------------ -->
        <NameField :name="$v.f.name" @name="changeName($event)" />

        <!-- ------------ -->
        <!--  Age Field  -->
        <!-- ------------ -->
        <AgeField :age="$v.f.age" @age="changeAge($event)" />

        <!-- ------------- -->
        <!--  Email Field  -->
        <!-- ------------- -->
        <EmailField :email="$v.f.email" @email="changeEmail($event)" />

        <!-- ------------ -->
        <!-- Send Button  -->
        <!-- ------------ -->
        <SendButton />
      </form>

      <!-- Show messages -->
      <div v-if="success != ''" class="alert alert-success">
        {{ success }}
      </div>
      <div v-else-if="errors != ''" class="alert alert-danger">
        {{ errors }}
      </div>
    </div>
  </section>
</template>

<script>
  import { required, maxLength, minLength, between, email } from '@vuelidate/validators';
  import AgeField from './AgeField.vue';
  import SendButton from './Button.vue';
  import EmailField from './EmailField.vue';
  import NameField from './NameField.vue';

  export default  {
    name: 'user-form',
    props: [],
    components : {
      AgeField,
      SendButton,
      EmailField,
      NameField
    },
    data () { 
      return {
        f: this.reset(),
        url: 'https://5f94bcac2de5f50016ca1a6f.mockapi.io/users',
        errors: '',
        success: ''
      }
    },
    methods: {
      /* form reset */
      reset() {
        return {
          age : '',
          email : '',
          name: ''
        }
      },
      /* Send form to mockapi */
      send(fields) {
        this.axios.post(this.url, fields, {'content-type': 'application/json'})
          .then(res => {
            if (res.data) {
              this.success = "User created"
              setTimeout(()=>{
                this.success = ""
              }, 3000);
            }
          })
          .catch(error => {
            this.errors = "Something went wrong: " + error.message
            setTimeout(()=>{
              this.errors = ""
            }, 3000);
          })
      },
      /* Submit form */
      async create() {
        this.errors = ''
        this.success = ''
        this.$v.$touch()
        if(!this.$v.$invalid) {
          let fileds = this.f
          await this.send(fileds)
          this.f = this.reset()
          this.$v.$reset()
        }
      },
      changeName(name) {
        this.$v.f.name.$model = name;
      },
      changeAge(age) {
        this.$v.f.age.$model = age;
      },
      changeEmail(email) {
        this.$v.f.email.$model = email;
      }
    },
    validations: {
      f: {
        age: { 
          required,
          between: between(18, 120)
        },
        email: { 
          required,
          email
        },
        name: { 
          required,
          maxLength: maxLength(15),
          minLength: minLength(5)
        },
      }
    }
  }
</script>

<style scoped lang="css">
  .jumbotron {
    background-color: rgb(114, 19, 51);
    color: white;
  }
  hr {
    background-color: #ddd;
  }
</style>
