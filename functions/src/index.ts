const {initializeApp} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

import {HttpsError, onCall} from 'firebase-functions/v2/https';

initializeApp();
const db = getFirestore();

type Image = {
  url: string;
  id: string;
};
type User = {
  id: string;
  name: string;
};

type PrintType = {
  images: Image[];
  name: string;
  summary?: string;
  description?: string;
  id?: string;
  published: string;
  updated?: string;
  rating: number;
  blueprint: string;
  author: User;
};

const validatePrint = (print: PrintType): boolean => {
  if (typeof print !== 'object') return false;
  if (print.id && typeof print.id !== 'string') return false;
  if (print.name && typeof print.name !== 'string') return false;
  if (print.published && typeof print.published !== 'string') return false;
  if (print.updated && typeof print.updated !== 'string') return false;
  if (print.rating && typeof print.rating !== 'number') return false;
  if (print.summary && typeof print.summary !== 'string') return false;
  if (print.description && typeof print.description !== 'string') return false;
  if (print.blueprint && typeof print.blueprint !== 'string') return false;
  if (
    print.images &&
    (!Array.isArray(print.images) || print.images.length === 0)
  )
    return false;
  if (
    print.author &&
    (typeof print.author !== 'object' || typeof print.author.id !== 'string')
  )
    return false;

  return true;
};

exports.createPrint = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  const blueprint = request.data.blueprint;
  const currentDate = new Date().toISOString();
  const printRef = db.collection('prints').doc();

  await printRef.set({
    id: printRef.id,
    images: blueprint.images,
    published: currentDate,
    name: blueprint.name,
    summary: blueprint.summary,
    description: blueprint.description,
    rating: 0,
    blueprint: blueprint.blueprint,
    author: blueprint.author,
    userId: blueprint.author.id,
  });

  return true;
});

exports.updatePrint = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }
  const printId = request.data.printId;
  const print = request.data.print;
  const currentDate = new Date().toISOString();

  if (!validatePrint(print)) {
    console.log('Print is not valid');
    return false;
  }

  return await db
    .collection('prints')
    .doc(printId)
    .update({...print, updated: currentDate});
});

exports.getPrints = onCall(async (request) => {
  const userId = request.data.userId;
  const lastId = request.data.lastId;
  const sortType = request.data.sortType || 'date';
  const limit = request.data.limit || 10;
  const prints: PrintType[] = [];
  let query = db.collection('prints');
  let favourites: Record<string, boolean> = {};

  if (request.auth) {
    const favouritesDoc = await db
      .collection('favourites')
      .doc(request.auth.uid)
      .get();
    if (favouritesDoc.exists) {
      favourites = favouritesDoc.data();
    }
  }

  if (typeof userId === 'string') {
    query = query.where('userId', '==', userId);
  }

  query = query.orderBy(sortType, 'desc');

  const count = await db.collection('prints').count().get();

  if (lastId) {
    query = query.startAt(lastId);
  }

  query = query.limit(limit);

  const snapshot = await query.get();

  const last = snapshot.docs[snapshot.docs.length - 1];

  snapshot.forEach((doc: any) => {
    prints.push({...doc.data(), id: doc.id, isFavourite: favourites[doc.id]});
  });

  return {
    prints,
    total: count.data().count,
    lastId: last.id,
  };
});

exports.getPrintById = onCall(async (request) => {
  const printId = request.data.printId;
  const doc = await db.collection('prints').doc(printId).get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  } else {
    let favourites = null;
    if (request.auth && request.auth.uid) {
      const favDocRef = db.collection('favourites').doc(request.auth.uid);

      await favDocRef.get().then(async (doc: any) => {
        if (doc.exists) {
          const docs = await favDocRef.get();
          favourites = docs.data();
        }
      });
    }

    const data = doc.data();

    if (favourites && data.id in favourites) {
      data.isFavourite = favourites[data.id];
    }

    return data;
  }
});

exports.toggleFavourite = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  const printId = request.data.printId;
  const userId = request.data.userId;
  const isFavourite = request.data.isFavourite;

  const printRef = db.collection('prints').doc(printId);
  let newRating = 0;

  try {
    await db.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(printRef);

      const oldRating = doc.data().rating;
      newRating = isFavourite ? oldRating - 1 : oldRating + 1;
      if (newRating < 0) newRating = 0;

      transaction.update(printRef, {rating: newRating});
    });

    console.log('Transaction success!');
  } catch (e) {
    console.log('Transaction failure:', e);
  }

  const favDocRef = db.collection('favourites').doc(userId);

  await favDocRef.get().then(async (doc: any) => {
    if (!doc.exists) {
      return await favDocRef.set({
        [printId]: !isFavourite,
      });
    } else {
      return await favDocRef.update({
        [printId]: !isFavourite,
      });
    }
  });

  return {
    rating: newRating,
    isFavourite: !isFavourite,
  };
});
