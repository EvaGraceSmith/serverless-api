import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'phone': String,
});

const people = dynamoose.model('people', schema);

export const handler = async(event) => {
  // console.log('this is the body', event.body);
  // remember:  event.pathParameters.id

  const response = {statusCode: null, body: null};

  try {
    let id;
    // if no id, return
    if(!event.pathParameters || !event.pathParameters.id){
      return 'error: no id';
    }else{
      id = event.pathParameters.id;
    }

    let results = await people.delete(id);

    console.log('results-------', results);

    // set response
    response.body = results;
    console.log('object deleted', results);
    response.statusCode = 200;
  }catch(err){
    console.log('error', err);
    response.body = JSON.stringify(err.message);
    response.statusCode = 500;
  }


  return response;
};
