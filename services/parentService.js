const getOne = (model) => (id) => new Promise((resolve, reject) => {
  model.findById(id).lean().exec()
    .then((doc) => {
      if (!doc) reject(new Error('Empty document'));
      resolve(doc);
    })
    .catch((e) => reject(e));
});

const getAll = (model) => new Promise((resolve, reject) => {
  model.find({}).lean().exec()
    .then((docs) => {
      if (!docs) reject(new Error('Empty documents'));
      resolve(docs);
    })
    .catch((e) => reject(e));
});

const createOne = (model) => (doc) => new Promise((resolve, reject) => {
  model.create(doc)
    .then(resolve(doc))
    .catch((e) => reject(e));
});

const deleteOne = (model) => (id) => new Promise((resolve, reject) => {
  model.findByIdAndRemove(id).lean().exec()
    .then((removed) => {
      if (!removed) reject(new Error('An error occured'));
      resolve(removed);
    })
    .catch((e) => reject(e));
});

const updateOne = (model) => (data) => new Promise((resolve, reject) => {
  model.findByIdAndUpdate(data).lean().exec()
    .then((updated) => {
      if (!updated) {
        reject(new Error('An error occured'));
      }
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
});
