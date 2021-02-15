import firebase from "../firebase";

const db = firebase.ref("/homes");

const getAll = () => {
    return db;
};

const getSingle = (key) => {
    return db.child(key);
};

// const create = (data) => {
//   return db.push(data);
// };

const update = (key, data) => {
    return db.child(key).update(data);
};

// const remove = (key) => {
//   return db.child(key).remove();
// };

// const removeAll = () => {
//   return db.remove();
// };

const ListingService = {
    getAll,
    getSingle,
    update,
}

export default ListingService;
