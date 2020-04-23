const MongoDB = "mongodb://localhost:27017/Parkinson";

var Db = require('mongodb').Db;
Server = require('mongodb').Server;

// var db = new Db("mongodb://localhost:27017/CRUD_DB");

var db = new Db('Parkinson', new Server('localhost', 27017))

var dbs = db.collection('patients');

module.exports = function getSequenceNextValue(seqName) {
                                var seqDoc = db.collection('patients').findAndModify({
                                query: { patientID: seqName },
                                update: { $inc: { seqValue: 1 } },
                                new: true
                                });
  
                                return seqDoc.seqValue;
                                };

 