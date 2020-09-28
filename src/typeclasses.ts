import { Eq, eqString, getStructEq } from 'fp-ts/Eq';
import { fromCompare } from 'fp-ts/Ord';

interface IUser {
  name: string;
  age?: number;
}

const users: IUser[] = [
  { name: 'Ivan', age: 30 },
  { name: 'John', age: 45 },
  { name: 'Julia', age: 25 },
];

// const eqUser: Eq<IUser> = {
//   equals: (x, y) => x.name === y.name,
// };

const eqUser = getStructEq<IUser>({
  name: eqString
});

const find = (users: IUser[]) => (name: string) =>
    users.filter(user => eqUser.equals({ name }, user));

console.log(1, find(users)('John'));


const ordNumber = fromCompare<number>((x, y) => x < y ? -1 : x > y ? 1 : 0);
const byAge = fromCompare<IUser>((x, y) => ordNumber.compare(x.age, y.age));

const sort = (users: IUser[]) => users.slice().sort((x, y) => byAge.compare(x, y));

console.log(2, sort(users));
