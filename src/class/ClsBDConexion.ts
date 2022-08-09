import { Pool } from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import { write } from '@lib/helpers';
import connect, { sequelize } from '@src/database';

/*
  Description: This class is for DataBase Connection
*/
class ClsBDConexion {
  // for querys
  public conn!: Pool;

  public flag: number;

  public sequelize!: Sequelize;

  constructor() {
    this.flag = 0;
    this.connectSequelize();
  }

  /*
    Description: The porpuse of this method is for to connect to DataBase
  */
  async connectBD() {
    try {
      if (this.flag === 0) return;
      this.conn = await connect();
      await this.conn.getConnection();
      write('Database connected', 'green');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      write(`Code: ${error.code}`, 'red');
      write(`Message: ${error.sqlMessage}`, 'red');
    }
  }

  /*
    Description: The porpuse of this method is to end the connection to DataBase by Sequelize
  */

  async connectSequelize() {
    try {
      if (this.flag === 0) return;
      await sequelize.authenticate();
      this.sequelize = sequelize;
      write('Database connected', 'green');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      write(`${error}`, 'red');
    }
  }

  async endConnection() {
    await this.conn.end();
    write('Database closed', 'red');
  }
}

export default new ClsBDConexion();
