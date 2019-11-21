/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const x509 = require('../index');
const fs = require('fs');
const path = require('path');

const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe('x509 js testing', () => {

    it('should read all the certificates and correctly parse', ()=>{

        fs.readdirSync(path.join(__dirname, 'certs')).forEach(function (file) {
            let filename = path.join(__dirname, 'certs', file);
            let correctDataFilename =  path.join(__dirname, 'correct-parsed-data', file);
            let parsedCert = x509.parseCert(path.join(__dirname, 'certs', file));
            let correctCert = JSON.parse(fs.readFileSync(correctDataFilename));
            delete correctCert.publicKey;
            delete parsedCert.publicKey;

            expect(parsedCert).to.deep.equal(correctCert);

            expect(x509.getIssuer(filename)).to.deep.equal(correctCert.issuer);
            expect(x509.getSubject(filename)).to.deep.equal(correctCert.subject);
            expect(x509.getAltNames(filename)).to.deep.equal(correctCert.altNames);
        });
    });

    describe('verify certificate tests', () => {
        it('should verify correctly', (done) => {
            x509.verify(
                path.join(__dirname, 'certs/enduser-example.com.crt'),
                path.join(__dirname, 'CA_chains/enduser-example.com.chain'),
                function (err) {
                    expect(err).to.be.null;
                    done();
                }
            );
        });


        it('should correctly fail to get issuer', (done) => {
            x509.verify(
                path.join(__dirname, 'certs/acaline.com.crt'),
                path.join(__dirname, 'CA_chains/enduser-example.com.chain'),
                function (err, result) {
                    expect(err.message).to.match(/unable to get local issuer/);
                    done();
                }
            );
        });

        it('should correctly fail with missing file', (done) => {
            x509.verify(
                path.join(__dirname, 'certs/notexisting.com.crt'),
                path.join(__dirname, 'CA_chains/enduser-example.com.chain'),
                function (err, result) {
                    expect(err.message).to.match(/ENOENT/);
                    done();
                }
            );
        });

        it('should correctly fail with error in chain CA', (done) => {
            x509.verify(
                path.join(__dirname, 'certs/equifax.crt'),
                path.join(__dirname, '/test.js'),
                function (err, result) {
                    expect(err.message).to.match(/Error loading CA chain file/);
                    done();

                }
            );
        });

        it('should correclty fail with file that is not a cert', (done) => {
            x509.verify(
                path.join(__dirname, '/test.js'),
                path.join(__dirname, 'CA_chains/enduser-example.com.chain'),
                function (err, result) {
                    expect(err.message).to.match( /Failed to load cert/);
                    done();
                }
            );
        });
    });

});

