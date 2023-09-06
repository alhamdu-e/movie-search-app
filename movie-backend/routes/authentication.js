require("dotenv").config();
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../database/connection");

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETE;
const hashPassword = function (txt) {
	const hash = crypto.createHash("md5");

	hash.update(txt);
	return hash.digest("hex");
};
router.post("/signup", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const hashedPassWord = hashPassword(password);
	const sql = "insert into user (email,password) values (?,?)";

	db.connect((error) => {
		if (error) {
			console.log(error);
			res.sendStatus(400);
			return;
		}
		db.query(sql, [email, hashedPassWord], (error, result) => {
			if (error) {
				console.log(error);
				res.sendStatus(400);
				return;
			} else {
				res.sendStatus(200);
			}
		});
	});
});
router.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const hashedPassWord = hashPassword(password);

	const sql = "select * from user where email= ? and password=?";

	db.connect((error) => {
		if (error) {
			res.sendStatus(400);
			return;
		}
		db.query(sql, [email, hashedPassWord], (error, result) => {
			if (error) {
				console.log(error);
				res.sendStatus(400);
				return;
			}
			if (result.length > 0) {
				const token = jwt.sign({}, secretKey);

				res.json(token);
				return;
			}
			const mese = false;
			if (result.length == 0) {
				res.json(mese);
			}
		});
	});
});

module.exports = router;
