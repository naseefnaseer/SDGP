// To get the age of the patient using DOB
exports.getAge = async function (bDate) { 
    var dateString = bDate.split('-');
    var dob = new Date(parseInt(dateString[0]), dateString[1], dateString[2] )
    var newDate = new Date();
    var age = newDate.getFullYear() - dob.getFullYear();
    var month = newDate.getUTCMonth() - dob.getUTCMonth();
    
    if (month < 0 || (month === 0 && newDate.getDate() < dob.getDate())) {
        age--;
    }
    return age;     
}
 