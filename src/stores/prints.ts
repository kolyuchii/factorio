import {functions} from '@utils/firebase.ts';
import {httpsCallable} from 'firebase/functions';
import {PrintType} from '@types';
import {atom} from 'nanostores';

export const $prints = atom(null);

export function createPrint(blueprint: PrintType) {
  const createPrint = httpsCallable(functions, 'createPrint');
  createPrint({blueprint})
    .then((result) => {
      // $lists.set(result?.data);

      return true;
    })
    .catch((error) => {
      console.log('createPrint ERROR:', error);
    });
}

export function getPrints({
  lastId,
  sortType,
  userId,
}: {
  lastId?: string;
  sortType?: string;
  userId?: string;
}): Promise<PrintType[]> {
  const getPrints = httpsCallable(functions, 'getPrints');

  return getPrints({lastId, sortType, userId})
    .then((result) => {
      $prints.set(result.data);
      return true;
    })
    .catch((error) => {
      console.log('createPrint ERROR:', error);
    });
}

export function getPrintById(printId: string): Promise<PrintType> {
  const getPrintById = httpsCallable(functions, 'getPrintById');
  return getPrintById({printId})
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log('createPrint ERROR:', error);
    });
}

export function toggleFavourite(
  printId: string,
  userId: string,
  isFavourite: boolean,
): Promise<PrintType> {
  const toggleFavourite = httpsCallable(functions, 'toggleFavourite');

  return toggleFavourite({printId, userId, isFavourite})
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log('toggleFavourite ERROR:', error);
    });
}
