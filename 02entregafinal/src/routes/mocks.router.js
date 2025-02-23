import express from 'express';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import petModel from '../dao/models/Pet.js'
import userModel from '../dao/models/User.js';
import adoptionModel from '../dao/models/Adoption.js';

const router = express.Router();

router.get('/mockingpets', async (req, res) => {
  try {
    const pets = Array.from({ length: 10 }, () => ({
      name: faker.animal.cat(),
      specie: faker.animal.type(),
      birthDate: faker.date.past(),
      adopted: faker.datatype.boolean(),
      image: faker.image.animals(640, 480, true),
    }));
    res.json(pets);
  } catch (error) {
    console.error('Error al generar mascotas mock:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/mockingusers', async (req, res) => {
  try {
    const users = Array.from({ length: 50 }, () => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('coder123', 10),
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: [],
    }));
    res.json(users);
  } catch (error) {
    console.error('Error al generar usuarios mock:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/generateData', async (req, res) => {
  const { users, pets } = req.body;

  if (!users || !pets || isNaN(users) || isNaN(pets)) {
    return res.status(400).json({ error: 'Los parámetros "users" y "pets" son requeridos y deben ser números.' });
  }

  try {
    const mockUsers = Array.from({ length: parseInt(users) }, () => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('coder123', 10),
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: [],
    }));

    const createdUsers = await userModel.insertMany(mockUsers);

    const mockPets = Array.from({ length: parseInt(pets) }, () => ({
      name: faker.animal.cat(),
      specie: faker.animal.type(),
      birthDate: faker.date.past(),
      adopted: true,
      owner: faker.helpers.arrayElement(createdUsers)._id, 
    }));

    const createdPets = await petModel.insertMany(mockPets);

    const adoptions = createdPets.map((pet) => ({
      owner: pet.owner,
      pet: pet._id,
    }));

    const createdAdoptions = await adoptionModel.insertMany(adoptions);

    await Promise.all(
      createdPets.map(async (pet) => {
        await userModel.updateOne(
          { _id: pet.owner },
          { $push: { pets: { _id: pet._id } } }
        );
      })
    );

    console.log('Usuarios creados:', createdUsers);
    console.log('Mascotas creadas:', createdPets);
    console.log('Adopciones creadas:', createdAdoptions);

    res.status(201).json({
      message: 'Datos generados e insertados correctamente.',
      users: createdUsers,
      pets: createdPets,
      adoptions: createdAdoptions,
    });
    
  } catch (error) {
    console.error('Error al generar datos:', error);
    res.status(500).json({ error: 'Error al insertar datos en la base de datos.' });
  }
});

export default router;