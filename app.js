var vue = new Vue({
  el: '#app',
  data:{
    status: 'signup',
    newUser: {
      name: '',
      surname: '',
      email: '',
      password: ''
    },
    transaction:{iban:'',amount:null},
    responseTransaction:false,
    currentUser: null,
    errorMessage: null,
    users: []
  },
  methods:{
      signup: function() {
          this.errorMessage = null;
          this.$http.post('http://localhost:3001/account/signup', this.newUser)
          .then(function(response){
            console.log("response:", response)
          })
          .catch(function(err){
            this.errorMessage = err.body.message;
            console.log(err);
          })
      },
      login: function() {
          this.errorMessage = null;
          this.$http.post('http://localhost:3001/account/login', {email: this.newUser.email, password: this.newUser.password})
          .then(function(response){
              localStorage.setItem('token', response.body.token);
              this.me();
          })
          .catch(function(err){
            this.errorMessage = err.body.message;
            console.log(err);
          })
      },
      logout: function() {
          this.currentUser = null;
          localStorage.removeItem('token');
      },
      me: function() {
          this.$http.get(`http://localhost:3001/account/me?token=${localStorage.getItem('token')}`)
          .then(function(response){
            console.log("response:", response);
            this.currentUser = response.body;
            console.log(this.currentUser)
          })
      },
      sendTransaction: function() {
        console.log(this.transaction)
          this.$http.post(`http://localhost:3001/transaction/${this.transaction.iban}?token=${localStorage.getItem('token')}`,this.transaction)
          .then(function(response){
            console.log("response:", response);
            this.responseTransaction = true;
          })
      }

  },
  created(){
      if (localStorage.getItem('token')) {
        this.me();
      }
    }
})
