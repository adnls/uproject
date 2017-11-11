import 'mocha';
import {expect, should} from 'chai';
import {Router} from 'express';
import request = require('supertest');
import {USERS} from './mock-users';
import User from '../src/entity/user';
import {CONFIG} from '../config/config';
import {SERVER as server} from '../bin/www';

describe('/user', () => {
	
	//Create 5 fake users in database
	before((done) => {
		let promises = [];
		USERS.forEach(() => {
			user.idString = user.id;
			delete user.id;
			user.created_date = new Date();
			promises.push(User.create(user));
		});
		Promise.all(promises).then(() => {
			done();
		}).catch(err => {
			throw err;
		});
	});
	
	describe('get all users', () => {
		it('should get all users', () => {
			return request(server)
				.get('/user')
				.expect('Content-Type', /json/)
				.set('Accept', 'application/json')
				.expect(200)
				.then(response => {
					let result = JSON.parse(response.text);
					expect(result.length).to.equal(5);
				});
		});
		
		it('should get all users with limit and skip', () => {
			return request(server)
				.get('/user?limit=2&skip=1')
				.expect('Content-Type', /json/)
				.set('Accept', 'application/json')
				.expect(200)
				.then(response => {
					let result = JSON.parse(response.text);
					expect(result.length).to.equal(2);
				});
		});
		it('should get all users with limit', () => {
			return request(server)
				.get('/user?limit=3')
				.expect('Content-Type', /json/)
				.set('Accept', 'application/json')
				.expect(200)
				.then(response => {
					let result = JSON.parse(response.text);
					expect(result.length).to.equal(3);
				});
		});
		it('should get all users with skip', () => {
			return request(server)
				.get('/user?skip=2')
				.expect('Content-Type', /json/)
				.set('Accept', 'application/json')
				.expect(200)
				.then(response => {
					let result = JSON.parse(response.text);
					console.log(result);
					expect(result.length).to.equal(3);
				});
		});
	});
	
	describe('post user', () => {
		it('should post user successfully', () => {
			let body = {
				"id": "toto",
				"firstName": "Anthony",
				"lastName": "Hopkins",
				"email": "anthony.hopkins@club-internet.fr",
				"created_date": {}
			};
			return request(server)
				.post('/user')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(201)
				.then(response => {
					expect(response.text).to.equal("item created");
					
				});
		});
		
		it('should return status 400 body error: bad key', () => {
			let body = {
				"id": "toto",
				"firstN": "Anthony",
				"lastName": "Hopkins",
				"email": "anthony.hopkins@club-internet.fr",
				"created_date": {}
			};
			return request(server)
				.post('/user')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(400)
				.then(response => {
					console.log(response.text);
					expect(response.text).to.equal("invalid input, object invalid");
					
				});
		});
		it('should return status 400 body error : none value', () => {
			let body = {
				"id": "toto",
				"firstName": "Anthony",
				"lastName": "",
				"email": "anthony.hopkins@club-internet.fr",
				"created_date": {}
			};
			return request(server)
				.post('/user')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(400)
				.then(response => {
					console.log(response.text);
					expect(response.text).to.equal("invalid input, object invalid");
					
				});
		});
		
		it('should return status 409', () => {
			let body = {
				"id": "518d666a2a00df0e490000b6",
				"firstName": "Gerard",
				"lastName": "Durand",
				"email": "gerard@yahoo.com",
				"created_date": "2017-09-17T10:50:53.000Z"
			};
			return request(server)
				.post('/user')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(409)
				.then(response => {
					expect(response.text).to.equal("an existing item already exists");
					
				});
		});
	});
	
	describe('get user', () => {
		it('should get user successfully', () => {
			return request(server)
				.get('/user/518d666a2a00df0e490000b9')
				.expect('Content-Type', /json/)
				.set('Accept', 'application/json')
				.expect(200)
				.then(response => {
					let result = JSON.parse(response.text);
					expect(result[0]).to.have.all.keys('id', 'firstName', 'lastName', 'email', 'created_date');
					expect(result[0].id).to.equal("518d666a2a00df0e490000b9");
					expect(result[0].firstName).to.equal("Anthony");
					expect(result[0].lastName).to.equal("Hopkins");
					expect(result[0].email).to.equal("anthony.hopkins@club-internet.fr");
				});
		});
	});
	
	describe('put user', () => {
		it('should return 201', () => {
			let body = {
				"id": "518d666a2a00df0e490000b8",
				"firstName": "anotherFirstName",
				"lastName": "anotherSecondName",
				"email": "toto@toto.fe",
				"created_date": "2017-09-17T10:50:53.000Z"
			};
			return request(server)
				.put('/user/518d666a2a00df0e490000b8')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(201)
				.then(response => {
					console.log(response.text);
					expect(response.text).to.equal("item created");
				});
		});
		
		it('should return 400, body error', () => {
			let body = {
				"id": "518d666a2a00df0e490000b8",
				"firstNa": "anotherFirstName",
				"lastName": "anotherSecondName",
				"email": "toto@toto.fe",
				"created_date": "2017-09-17T10:50:53.000Z"
			};
			return request(server)
				.put('/user/518d666a2a00df0e490000b8')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(400)
				.then(response => {
					console.log(response.text);
					expect(response.text).to.equal("invalid input, object invalid");
				});
		});
		
		it('should return 409', () => {
			let body = {
				"id": "518d666a2a00df0e490000b7",
				"firstName": "anotherFirstName",
				"lastName": "anotherSecondName",
				"email": "toto@toto.fe",
				"created_date": "2017-09-17T10:50:53.000Z"
			};
			return request(server)
				.put('/user/518d666a2a00df0e490000b8')
				.send(body)
				.expect('Content-Type', "text/html; charset=utf-8")
				.set('Accept', "text/html; charset=utf-8")
				.expect(409)
				.then(response => {
					console.log(response.text);
					expect(response.text).to.equal("an existing item already exists");
				});
		});
	});
});