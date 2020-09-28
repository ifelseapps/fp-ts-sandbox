import * as Eq from 'fp-ts/Eq';
import * as Ord from 'fp-ts/Ord';

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

const eqUser = Eq.getStructEq<IUser>({
  name: Eq.eqString
});

const find = (users: IUser[]) => (name: string) =>
    users.filter(user => eqUser.equals({ name }, user));

console.log(1, find(users)('John'));


const ordNumber = Ord.fromCompare<number>((x, y) => x < y ? -1 : x > y ? 1 : 0);
// const byAge = fromCompare<IUser>((x, y) => ordNumber.compare(x.age, y.age));
const byAge = Ord.contramap<number, IUser>((user) => user.age)(ordNumber);

const sort = (users: IUser[]) => users.slice().sort((x, y) => byAge.compare(x, y));
console.log(2, sort(users));

const getYounger = min(byAge);
console.log(3, getYounger(users[0], users[2]));



function min<A>(O: Ord.Ord<A>): (x: A, y: A) => A {
  return (x, y) => O.compare(x, y) === 1 ? y : x;
}
