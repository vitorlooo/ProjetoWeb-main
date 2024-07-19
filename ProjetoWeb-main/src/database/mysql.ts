import mysql from 'mysql2/promise';

const configuracaoBD = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Luppy2020', 
  database: 'bancoweb'
};


const pool = mysql.createPool(configuracaoBD);

export default pool;
