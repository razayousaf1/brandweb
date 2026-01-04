const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'shahsawaar-17832'
});

// Import Firestore
const { Firestore } = require('@google-cloud/firestore');

// Get both databases
const defaultDb = new Firestore({
  projectId: 'shahsawaar-17832',
  keyFilename: './serviceAccount.json'
});

const productionDb = new Firestore({
  projectId: 'shahsawaar-17832',
  keyFilename: './serviceAccount.json',
  databaseId: 'production'
});

async function migrateCollection(collectionName) {
  try {
    console.log(`\n📦 Migrating ${collectionName}...`);
    
    // Get all documents from default database
    const snapshot = await defaultDb.collection(collectionName).get();
    
    if (snapshot.empty) {
      console.log(`⚠️  ${collectionName} is empty, skipping`);
      return 0;
    }
    
    console.log(`Found ${snapshot.size} documents in ${collectionName}`);
    
    // Firestore batch limit is 500
    let batches = [];
    let currentBatch = productionDb.batch();
    let operationCount = 0;
    
    snapshot.forEach((doc) => {
      const ref = productionDb.collection(collectionName).doc(doc.id);
      currentBatch.set(ref, doc.data());
      operationCount++;
      
      // Every 500 operations, start a new batch
      if (operationCount === 500) {
        batches.push(currentBatch);
        currentBatch = productionDb.batch();
        operationCount = 0;
      }
    });
    
    // Add the last batch if it has operations
    if (operationCount > 0) {
      batches.push(currentBatch);
    }
    
    // Commit all batches
    console.log(`Committing ${batches.length} batch(es)...`);
    for (let i = 0; i < batches.length; i++) {
      await batches[i].commit();
      console.log(`✓ Batch ${i + 1}/${batches.length} committed`);
    }
    
    console.log(`✅ ${collectionName} migrated successfully (${snapshot.size} documents)`);
    return snapshot.size;
    
  } catch (error) {
    console.error(`❌ Failed to migrate ${collectionName}:`, error.message);
    console.error(error);
    return 0;
  }
}

async function migrateAllData() {
  console.log('🚀 Starting database migration from (default) to production...\n');
  
  // List of collections to migrate
  const collections = ['orders', 'cart', 'wishlists'];
  
  let totalMigrated = 0;
  
  for (const collectionName of collections) {
    const count = await migrateCollection(collectionName);
    totalMigrated += count;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`🎉 Migration completed!`);
  console.log(`Total documents migrated: ${totalMigrated}`);
  console.log('='.repeat(50));
  
  process.exit(0);
}

// Run the migration
migrateAllData().catch((error) => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
