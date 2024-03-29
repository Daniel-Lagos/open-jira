import { NextApiRequest, NextApiResponse } from 'next';
import { Entry } from '../../../../models';
import { db } from '../../../../database';
import { Data } from '../index';
import mongoose from 'mongoose';

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch ( req.method ) {
    case 'PUT':
      return updateEntry( req, res );

    case 'GET':
      return getEntry( req, res );

    default:
      return res.status(400).json({ message: 'Método no existe ' + req.method });
  }

}

const getEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>) => {

  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById( id );

  if ( !entry ) {
    await db.disconnect();
    return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
  }

  try {
    await db.disconnect();
    res.status(200).json( entry! );

  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

};

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>) => {

  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById( id );

  if ( !entryToUpdate ) {
    await db.disconnect();
    return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
    await db.disconnect();
    res.status(200).json( updatedEntry! );

  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

};
