exports.getAge = function (data) { 
    var diff_ms = Date.now() - data.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - data.getYear());
}

