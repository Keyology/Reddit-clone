const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../controllers/posts');
const Post = require('../models/post');

chai.use(chaiHttp);

describe('site', () => {
    // Describe what you are testing
    it('Should have home page', done => {
        chai
            .request('localhost:3000')
            .get('/')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done(); // call done if test is successful
            });
    });
});

module.post = server;