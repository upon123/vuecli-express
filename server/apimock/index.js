const carList = require('./carList');
const carDetail = require('./carDetail');
const dealerList = require('./dealerList');
const getDealerPhone = require('./getDealerPhone');
module.exports = function(router) {
	router.use('/', function(req, res, next) {
		var svName = req.body.serviceName;
		switch(svName){
      case "app.query.carList":
        res.json(carList);
        break;
      case "app.query.carDetail":
        res.json(carDetail);
        break;
      case "app.query.dealerList":
        console.log(dealerList);
        res.json(dealerList);
        break;
        case "app.query.getDealerPhone":
          console.log(getDealerPhone);
          res.json(getDealerPhone);
          break;
          default:
          break;
    }
	});
};
