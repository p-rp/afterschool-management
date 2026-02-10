// Database connectivity test
import dotenv from 'dotenv';
dotenv.config();

import { db } from '../src/db/index';
import { users } from '../src/db/schema';

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    const result = await db.select().from(users).limit(1);
    console.log('[OK] Database connection successful!');
    console.log(`[INFO] Found ${result.length} users (sample query)`);
    
    if (result.length > 0) {
      const user = result[0];
      console.log('[INFO] Sample user:', {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      });
    }
  } catch (error) {
    console.error('[ERROR] Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testDatabaseConnection();
