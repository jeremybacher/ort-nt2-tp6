<template>
  <section class="list-users">
    <div class="table-responsive">
      <table class="table">
        <tr class="bg-success text-white">
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
        <tr
          class="bg-info text-white"
          v-for="(user, index) in users"
          :key="index"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </table>

      <!-- Show errors -->
      <div v-if="errors != ''" class="alert alert-danger">
        {{ errors }}
      </div>
    </div>
  </section>
</template>

<script>
  export default  {
    name: 'list-users',
    props: [],
    mounted () {
      this.fetchUsers()
    },
    data () {
      return {
        url: 'https://5f94bcac2de5f50016ca1a6f.mockapi.io/users',
        users: [],
        errors: ''
      }
    },
    methods: {
      /* fetch users */
      async fetchUsers() {
        this.axios(this.url)
          .then(res => {
            if (res.data.length > 0) {
              this.users = res.data
            } else {
              this.errors = 'No users were found'
            }            
          })
          .catch(error => this.errors = error.message)
      }
    }
  }
</script>
