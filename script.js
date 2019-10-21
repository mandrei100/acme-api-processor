const grabCompanies =() => {  
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/companies')
    .then(response => response.json())
    .then(jsonData => jsonData)
    .catch(e => console.log(e));
}

const grabProducts =() => {  
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/products')
    .then(response => response.json())
    .then(jsonData => jsonData)
    .catch(e => console.log(e));
    
}

const grabOfferings =() => {  
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/Offerings')
    .then(response => response.json())
    .then(jsonData => jsonData)
    .catch(e => console.log(e));
}

// price range
// const productsInPriceRange = findProductsInPriceRange(products , {min: 1, max: 15});
const productsInPriceRange = (products , {min: 1, max: 15}) => {
  let rangeMin = arguments[1].min;
  let rangeMax = arguments[1].max;
  let array = [];
  return  products.filter(finder => {
      if (finder.suggestedPrice >= rangeMin && finder.suggestedPrice <= rangeMax){
        array.push(finder.suggestedPrice);
      } else {
        return undefined;
      }
    })
};

// returns object where key is frist letter of company name
// value for each key is the array of these companies
// const groupCompaniesByLetters = groupCompaniesByLetters(companies);
const groupCompaniesByLetters = (companies) => {
  let obj = {};
  companies.forEach(finder => {
      obj[finder.name[0]] = finder.name;
  })
  return obj;
}


// returns object where key is a state
// value for each key is the array of those companies in that state
// PROBLEM: const groupCompaniesByState = goupCOmpaniesByState(companies);
const goupCompaniesByState = (companies) => {
    let obj = {};
    for (var i in companies){
      for (var j in companies[i]){
        if (j === 'state'){
        obj[j] = companies[i].name;
        }
      }
    }
    
    return obj;
  }
// returns an array of the offerings with each offering having a company and product
// const processedOfferings = processOfferings()
const processOfferings = (offerings) => {
  let obj = {};
  offerings.forEach(finder => {
    let array = [];
    for (var i in offerings){
      if (finder.companyId === offerings[i].companyId){
        array.push(finder.productId);
      }
    }
 
    obj[finder.companyId] = array;
  })

  return obj;
}

// returns the cocompanies that have n or more offerings
const threeOrMoreOfferings = companiesByNumberOfOfferings(companies, offerings, 33);

// returns array of products where each product has the average price of it's offerings
// const processedProducts = processProducts({products, offerings});
const processedProducts = (products) => {
  let obj = {};
  let average = 0;
  products.forEach(finder => {
    let array = [];
    for (var j in products){
          if (finder.productId === products[j].productId){
            array.push(products[j].price);
          }
         
        }
        average = array.reduce((a,b)=>(a+b)/array.length);

        obj[finder.productId] = average;
  })
  return obj;
}


// const companiesByState = (companies, state) => companies.filter(company => company.state === state);
// returns companiesInTexas = companiesByState(companies, 'Texas');