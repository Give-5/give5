#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 GIVE5 APP AUDIT\n');

// Check environment variables
console.log('1. ENVIRONMENT VARIABLES:');
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL:', envContent.includes('NEXT_PUBLIC_SUPABASE_URL=') ? '✅ Set' : '❌ Missing');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY:', envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') ? '✅ Set' : '❌ Missing');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY:', envContent.includes('SUPABASE_SERVICE_ROLE_KEY=') ? '✅ Set' : '❌ Missing');
} else {
  console.log('❌ .env.local NOT FOUND');
}

// Check dependencies
console.log('\n2. DEPENDENCIES:');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const requiredDeps = [
  '@supabase/auth-helpers-nextjs',
  '@supabase/auth-helpers-react',
  '@supabase/ssr',
  '@supabase/supabase-js',
  'next',
  'react',
  'react-dom'
];

requiredDeps.forEach(dep => {
  const installed = packageJson.dependencies[dep];
  console.log(`   - ${dep}:`, installed ? `✅ ${installed}` : '❌ Missing');
});

// Check key files
console.log('\n3. KEY FILES:');
const keyFiles = [
  'middleware.ts',
  'lib/supabase/client.ts',
  'lib/supabase/server.ts',
  'lib/supabase/middleware.ts',
  'lib/contexts/auth-context.tsx',
  'app/auth/callback/route.ts',
  'app/layout.tsx',
  'app/page.tsx',
  'app/home/page.tsx'
];

keyFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  console.log(`   - ${file}:`, fs.existsSync(filePath) ? '✅ Exists' : '❌ Missing');
});

// Check auth flow
console.log('\n4. AUTH FLOW COMPONENTS:');
console.log('   - Middleware:', fs.existsSync(path.join(__dirname, '../middleware.ts')) ? '✅ Set up' : '❌ Missing');
console.log('   - Auth Context:', fs.existsSync(path.join(__dirname, '../lib/contexts/auth-context.tsx')) ? '✅ Created' : '❌ Missing');
console.log('   - OAuth Callback:', fs.existsSync(path.join(__dirname, '../app/auth/callback/route.ts')) ? '✅ Created' : '❌ Missing');

// Check database
console.log('\n5. DATABASE:');
const migrationsDir = path.join(__dirname, '../supabase/migrations');
if (fs.existsSync(migrationsDir)) {
  const migrations = fs.readdirSync(migrationsDir);
  console.log(`   - Migrations: ✅ ${migrations.length} files`);
  migrations.forEach(m => console.log(`     • ${m}`));
} else {
  console.log('   - Migrations: ❌ Directory missing');
}

// Check for common issues
console.log('\n6. COMMON ISSUES:');
console.log('   - React StrictMode: Enabled (can cause double renders)');
console.log('   - Next.js version: ' + packageJson.dependencies.next);
console.log('   - Node version: ' + process.version);

// Test Supabase connection
console.log('\n7. SUPABASE CONNECTION TEST:');
console.log('   - Visit http://localhost:3000/debug to test connection');

console.log('\n📋 RECOMMENDATIONS:');
console.log('1. Ensure all environment variables are set correctly');
console.log('2. Run "npm install" to ensure all dependencies are installed');
console.log('3. Check browser console for errors when loading pages');
console.log('4. Test with "npm run test:e2e" for comprehensive testing');
console.log('5. Use the debug page to verify Supabase connection');

console.log('\n✨ Audit complete!\n');