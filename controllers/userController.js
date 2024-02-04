const db = require("../database/models");
const User = db.User;
const bcrypt = require("bcrypt");

exports.create = (req, res) => {

    // daya yang didapatkan dari inputan oleh pengguna
    ;
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role ? req.body.role : false,
    };

    // proses menyimpan kedalam database
    User.create(user).then((data) => {
        res.json({
            message: "User created successfully.",
            data: data,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the user.",
            data: null,
        });
    });
};

  // READ: menampilkan atau mengambil semua data sesuai model dari database
  exports.findAll = (req, res) => {
    User.findAll({
        attributes: { exclude: ['password' ]}
    }).then((users) => {
        res.json({
            message: "User retrived succesfully",
            data: users,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error",
            data: null,
        });
    });
  };

  // UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params 

  exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password);
    }

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role ? req.body.role : false,
    };

    User.update(userData, {
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "User updated successfully.",
                data: userData, // Return the updated data
            });
        } else {
            res.json({
                message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
                data: userData,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the user.",
            data: null,
        });
    });
  };

  // DELETE: Menghapus data sesuai id yang dikirimkan
  exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "User deleted successfully.",
                data: req.body,
            })
        } else {
            res.json({
                message: `Cannot delete user with id=${id}. Maybe user was not found!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the user.",
            data: null,
        });
    });
  };

  // BONUS ===> Mengambil data sesuai id yang dikirimkan
  exports.findOne = (req, res) => {
    User.findByPk(req.params.id).then((user) => {
        res.json({
            message: "user retrieved successfully.",
            data: user,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving user.",
            data: null,
        })
    })
  }