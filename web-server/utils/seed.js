import postgresDB from '../db/postgres';
import { CHANNELS_TABLE } from '../models/channel';

export default function seed() {
  console.log('seeding database...');

  return postgresDB(CHANNELS_TABLE)
  .insert([
    {
      name: 'general'
    },
    {
      name: 'funny'
    },
    {
      name: 'news'
    }
  ]);
}
