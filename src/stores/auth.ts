import {atom} from 'nanostores';
import {Auth, getAuth, onAuthStateChanged, User} from 'firebase/auth';
import app from '@utils/firebase';

const auth: Auth = getAuth(app);
const $auth = atom<User | null | undefined>();

onAuthStateChanged(auth, (user) => {
  $auth.set(user);
});

export async function logOut() {
  await auth.signOut();
}

export default $auth;
