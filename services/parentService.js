const getOne = (model) => (filter) => new Promise((resolve, reject) => {
  model.findOne(filter).lean().exec()
    .then((doc) => {
      if (!doc) reject(new Error('Error Occured'));
      resolve(doc);
    })
    .catch((e) => reject(e));
});

const getAll = (model) => (fields = '') => new Promise((resolve, reject) => {
  model.find({}).select(fields).lean().exec()
    .then((docs) => {
      if (!docs) reject(new Error('Error Occured '));
      resolve(docs);
    })
    .catch((e) => reject(e));
});

const getPopulate = (model) => (filter, ref, fields = '') => new Promise((resolve, reject) => {
  model.find(filter).populate(ref).select(fields)
    .lean()
    .exec()
    .then((docs) => {
      if (!docs) reject(new Error('Something Happened'));
      console.log(docs);
      resolve(docs);
    })
    .catch((e) => reject(e));
});

const getMany = (model) => (filter, fields = '') => new Promise((resolve, reject) => {
  model.find(filter).select(fields).lean().exec()
    .then((docs) => {
      if (!docs) reject(new Error('Error Occured'));
      resolve(docs);
    })
    .catch((e) => reject(e));
});

const createOne = (model) => (data) => new Promise((resolve, reject) => {
  model.create(data)
    .then((doc) => {
      if (!doc) reject(new Error('Something went wrong'));
      resolve(doc);
    })
    .catch((e) => reject(e));
});

const deleteOne = (model) => (filter) => new Promise((resolve, reject) => {
  model.findOneAndRemove(filter).lean().exec()
    .then((removed) => {
      if (!removed) reject(new Error('An error occured'));
      resolve(removed);
    })
    .catch((e) => reject(e));
});

const updateOne = (model) => (filter, data, options) => new Promise((resolve, reject) => {
  model.findOneAndUpdate(filter, data, options).lean().exec()
    .then((updated) => {
      if (!updated) {
        reject(new Error('An error occured'));
      }
      console.log(updated);
      resolve(updated);
    })
    .catch((e) => reject(e));
});

module.exports = (model) => ({
  getOne: getOne(model),
  getAll: getAll(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
  getMany: getMany(model),
  getPopulate: getPopulate(model)
});
