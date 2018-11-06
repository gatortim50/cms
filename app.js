const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('./docs/data.json', 'utf8'));

function transform(arr) {
  const cloneArr = [...arr];
  
  return cloneArr.map(obj => {
    const custId = obj.customer.id;
    obj.customerId = custId;
    delete obj.customer;
    const orderObj = transformOrder(obj.order);
    obj.order = orderObj;
    return obj;
  });
}

function transformOrder(obj) {
  const resultArr = [];
  const keys = Object.keys(obj);
  const items = [];
  keys.map(function(key) {
    const itemObj = {};
    const { quantity, price } = obj[key];
    itemObj.item = key;
    itemObj.quantity = quantity;
    itemObj.price = price;
    itemObj.revenue = quantity * price;
    items.push(itemObj);
  });
  return items;
}

const content = JSON.stringify(transform(obj), null, 1);

fs.writeFile('./data-transformed.json', content, 'utf8', function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
});