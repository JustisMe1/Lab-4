const { response } = require("express");
const bcrypt = require('bcrypt');
const {model} = require('mongoose');
const { Animal } = require("../models/Animal");