import Channel from '../models/channel';
import User from '../models/user';

const channels = [
  'general',
  'funny',
  'jobs',
];

const users = [
  {
    username: 'marco',
    password: 'test'
  },
  {
    username: 'kublai',
    password: 'test'
  },
];

export default function seed() {
  console.log('seeding database...');

  return Channel.createMany(channels)
    .then(() => User.createMany(users));
}
