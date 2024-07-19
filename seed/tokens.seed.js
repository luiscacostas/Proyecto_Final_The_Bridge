const mongoose = require('mongoose');
const Token = require('../models/tokens.models');
const connectDB = require('../config/db_mongo');

const tokens = [
  { name: 'Parque del Retiro', description: 'Un gran parque en el centro de Madrid.', latitude: 40.415363, longitude: -3.684524 },
  { name: 'Museo del Prado', description: 'Uno de los museos de arte más importantes del mundo.', latitude: 40.413782, longitude: -3.692127 },
  { name: 'Palacio Real', description: 'La residencia oficial de la Familia Real Española.', latitude: 40.417994, longitude: -3.714327 },
  { name: 'Plaza Mayor', description: 'Una de las plazas más importantes de Madrid.', latitude: 40.415363, longitude: -3.707398 },
  { name: 'Gran Vía', description: 'Una de las calles más famosas de Madrid.', latitude: 40.419384, longitude: -3.703405 },
  { name: 'Puerta del Sol', description: 'Una plaza céntrica y uno de los lugares más conocidos de Madrid.', latitude: 40.416775, longitude: -3.703790 },
  { name: 'Templo de Debod', description: 'Un antiguo templo egipcio en el Parque del Oeste.', latitude: 40.425869, longitude: -3.717044 },
  { name: 'Santiago Bernabéu', description: 'El estadio del Real Madrid.', latitude: 40.453054, longitude: -3.688344 },
  { name: 'Museo Reina Sofía', description: 'Un importante museo de arte moderno y contemporáneo.', latitude: 40.408731, longitude: -3.694527 },
  { name: 'Plaza de Cibeles', description: 'Una de las plazas más emblemáticas de Madrid.', latitude: 40.419018, longitude: -3.693437 },
  { name: 'Mercado de San Miguel', description: 'Un mercado histórico con una gran variedad de alimentos y bebidas.', latitude: 40.415574, longitude: -3.708219 },
  { name: 'Puerta de Alcalá', description: 'Una de las cinco antiguas puertas reales que daban acceso a Madrid.', latitude: 40.420548, longitude: -3.688775 },
  { name: 'Zoo Aquarium de Madrid', description: 'Un zoológico y acuario en la Casa de Campo.', latitude: 40.409370, longitude: -3.762012 },
  { name: 'Teleférico de Madrid', description: 'Un teleférico que conecta la Casa de Campo con el Parque del Oeste.', latitude: 40.421560, longitude: -3.725562 },
  { name: 'El Rastro', description: 'Un mercado al aire libre que se celebra todos los domingos.', latitude: 40.406961, longitude: -3.707329 },
  { name: 'Estadio Wanda Metropolitano', description: 'El estadio del Atlético de Madrid.', latitude: 40.436193, longitude: -3.599178 },
  { name: 'Palacio de Cristal', description: 'Un pabellón de cristal en el Parque del Retiro.', latitude: 40.413860, longitude: -3.682482 },
  { name: 'Museo Sorolla', description: 'Un museo dedicado a la obra del pintor Joaquín Sorolla.', latitude: 40.435421, longitude: -3.694161 },
  { name: 'Catedral de la Almudena', description: 'La catedral de Madrid.', latitude: 40.415228, longitude: -3.714329 },
  { name: 'Parque de Atracciones de Madrid', description: 'Un parque de atracciones en la Casa de Campo.', latitude: 40.408334, longitude: -3.745374 },
];

async function seedTokens() {
  try {
    await connectDB();
    await Token.deleteMany({});
    await Token.insertMany(tokens);
    console.log('Tokens seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding tokens:', error);
    mongoose.disconnect();
  }
}

seedTokens();