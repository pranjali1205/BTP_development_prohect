const Store = require('../models/Store');
// const Path = require('../models/Path');

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addStores = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);

    return res.status(201).json({  // Use 201 for resource creation
      success: true,
      data: store,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This store already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
