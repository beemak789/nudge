const router = require('express').Router();
const { Store, Type } = require('../db');
const sequelize = require('sequelize');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    // this is hardcoded, we can send long/lat with the req
    const lng = -73.96319586822943;
    const lat = 40.68076554817467;
    const fromRadius = 500;
    // pharmacy
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

    res.send(stores);
  } catch (ex) {
    next(ex);
  }
});
