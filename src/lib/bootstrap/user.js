const env = process.env.NODE_ENV || 'development';

const users = (env === 'development')
  ? [
    {
      name: 'Super Admin User',
      email: 'sa@mailinator.com',
      role: 'superAdmin'
    }
  ]
  : [
    {
      name: 'Super Admin User',
      email: 'sa@mailinator.com',
      role: 'superAdmin'
    }
  ];

module.exports = users;