const router = require('express').Router();
const { Store, Type } = require('../db');
const sequelize = require('sequelize');
module.exports = router;

router.get('/:lng/:lat', async (req, res, next) => {
  try {
    // this is hardcoded, we can send long/lat with the req
    console.log("hello we're here")
    const lng = Number(req.params.lng)
    const lat = Number(req.params.lat)
    const fromRadius = 2000;
    // convenience store
    const typeId = 1;

    const location = sequelize.literal(
      `ST_GeomFromText('POINT(${lng} ${lat})', 4326)`
    );

    const stores = await Store.findAll({
      include: {
        model: Type,
        through: {
          where: {
            typeId: typeId,
          },
        },
      },
      attributes: [
        'place_id',
        'name',
        'address',
        'business_status',
        'longitude',
        'latitude',
        [
          sequelize.fn('ST_DistanceSphere', sequelize.literal('geo'), location),
          'distance',
        ],
      ],
      where: sequelize.where(
        sequelize.fn('ST_DistanceSphere', sequelize.literal('geo'), location),
        '<=',
        fromRadius
      ),
    });
    console.log("STORES", stores)
    res.send(stores);
  } catch (ex) {
    next(ex);
  }
});
