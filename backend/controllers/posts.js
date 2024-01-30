const postRouter = require('express').Router()
const{response} = require('express')
const jwt = require('jsonwebtoken')
const Post = require('..models/post')
