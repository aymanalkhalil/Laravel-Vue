<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button class="btn btn-success" @click="newModal">
                Add New
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ userType(user.type) }}</td>

                  <td>
                    <a href="#" @click="editModal(user)" class="btn btn-warning"
                      ><i class="fa fa-edit"></i
                    ></a>
                    <a
                      href="#"
                      @click="deleteUser(user.id)"
                      class="btn btn-danger"
                      ><i class="fa fa-trash"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="adduser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editmode" id="exampleModalLabel">
              New User
            </h5>
            <h5 class="modal-title" v-show="editmode" id="exampleModalLabel">
              Update User Info
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Name"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <HasError :form="form" field="name" />

                <!-- <div
                  v-if="form.errors.has('name')"
                  v-html="form.errors.get('name')"
                /> -->
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="Email"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <HasError :form="form" field="email" />

                <!-- <div
                  v-if="form.errors.has('email')"
                  v-html="form.errors.get('email')"
                /> -->
              </div>
              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <HasError :form="form" field="password" />

                <!-- <div
                  v-if="form.errors.has('password')"
                  v-html="form.errors.get('password')"
                /> -->
              </div>

              <div class="form-group">
                <select name="type" v-model="form.type" class="form-control">
                  <option value="">Select User Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Author</option>
                </select>
                <HasError :form="form" field="type" />

                <!-- <div
                  v-if="form.errors.has('type')"
                  v-html="form.errors.get('type')"
                /> -->
              </div>
              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  name="bio"
                  class="form-control"
                  placeholder="Short bio for user(Optional)"
                />
                <HasError :form="form" field="bio" />

                <!-- <div
                  v-if="form.errors.has('bio')"
                  v-html="form.errors.get('bio')"
                /> -->
              </div>
            </div>

            <!-- modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
              <button v-show="editmode" type="submit" class="btn btn-success">
                Update
              </button>
              <button v-show="!editmode" type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </form>

          <!-- modal content end tag -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editmode: false,
      users: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: "",
      }),
    };
  },
  methods: {
    newModal() {
      this.editmode = false;

      this.form.reset();
      $("#adduser").modal("show");
    },
    editModal(user) {
      this.editmode = true;
      this.form.reset();
      $("#adduser").modal("show");
      this.form.fill(user);
    },

    createUser() {
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          Fire.$emit("CreatedUser");
          $("#adduser").modal("hide");
          toast.success("User Created Successfully !");

          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
          toast.error("Error in creating user !");
        });
    },
    getUsers() {
      axios.get("api/user").then(({ data }) => (this.users = data.data));
    },
    updateUser() {
      this.$Progress.start();

      this.form
        .put("api/user/" + this.form.id)
        .then(() => {
          //success
          Fire.$emit("CreatedUser");
          $("#adduser").modal("hide");

          toast.success("User Updated Successfully!");

          this.$Progress.finish();
        })
        .catch(() => {
          toast.success("Error in Update!");

          this.$Progress.fail();
        });
    },

    deleteUser(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          // Send The Request to delete User
          if (result.isConfirmed) {
            this.form
              .delete("api/user/" + id)
              .then(() => {
                swal.fire("Deleted!", "User Deleted Successfully!", "success");
                Fire.$emit("CreatedUser");
              })
              .catch(() => {
                toast.error("Error during delete !");
              });
          }
        });
    },
    userType($number) {
      if ($number == 1) {
        return "Admin";
      } else if ($number == 2) {
        return "User";
      } else if ($number == 3) {
        return "Author";
      }
    },
  },
  created() {
    this.getUsers();
    Fire.$on("CreatedUser", () => {
      this.getUsers();
    });
  },
};
</script>


