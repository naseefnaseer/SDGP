var axios = require('axios');
const request = require('request');

exports.getAge = async function (bDate) { 
    var dateString = bDate.split('-');
    var dob = new Date(parseInt(dateString[2]), dateString[1], dateString[0] )
    var newDate = new Date();
    var age = newDate.getFullYear() - dob.getFullYear();
    var m = newDate.getUTCMonth() - dob.getUTCMonth();
    var d = newDate.getDate() < dob.getDate();
    
    if (m < 0 || (m === 0 && newDate.getDate() < dob.getDate())) {
        age--;
    }
    return age;     
}

// exports.getPrediction = function(reqML) {

//     var prediction 

//     axios.post('http://localhost:5000/predict', reqML) 
//     .then((res) => {
//         console.log(res.data);
        
//         predResponse = res.data;

//         console.log(predResponse);
        
//     }).catch((err) => {
//         console.error(err); 
//     });

//     return prediction;
// };


exports.getPrediction = async function(reqML) {

    let res = await axios.post('http://localhost:5000/predict', reqML);

    // console.log(res.data);

    return res.data;    
  }


  exports.getP =  function (reqML) {
    return  axios.post('http://localhost:5000/predict', reqML);
  }

exports.registerUser = async function(data){
    await axios.post('http://localhost:5000/predict', data).then(response =>{
        return response.data;
    }).catch(err =>{
        console.log(err);
        return;
    })
}

exports.getBreeds = async (reqML) => {
    try {
      return await axios.post('http://localhost:5000/predict', reqML);
    } catch (error) {
      console.error(error);
    }
  }


  exports.fetchFromRemoteServer = function(req, res, next){
    const query = req;
  
  async.parallel([
   function(callback){
     axios({
        method: 'post',
        url: 'http://www.someUrl.com',
        params: query
      }).then(function(response){
        callback(false, response);
      });
  }],function(error, result){
     res.json(result[0].data.results);
   }); 
  }