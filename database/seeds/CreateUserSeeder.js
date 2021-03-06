'use strict'

/*
|--------------------------------------------------------------------------
| CreateUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const uuidv4 = require('uuid/v4');
const Language = use('App/Models/Language')
const Organization = use('App/Models/Organization')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Location = use('App/Models/Location')
const Device = use('App/Models/Device')

class CreateUserSeeder {
  async run () {
   
    const en = await Language.create({
      id: 'en',
      name: 'English',
    });
    
    const ar = await Language.create({
      id: 'ar',
      name: 'Arabic',
    });
    const ur = await Language.create({
      id: 'ur',
      name: 'Urdu',
    });

    const organization = new Organization()
    organization.primaryKeyValue = uuidv4()
    await organization.save()

    organization.languagesSupport().attach(['en', 'ar'])
    await organization.languages().attach(['en'], (row) => {
        row.name = "Face Survey Inc."
    })

    const superAdmin = await Role.create({
      id: 1,
      slug: 'super_admin',
      name: 'Super Admin',
      description: 'Super Admin....'
    });

    const tenantAdmin = await Role.create({
      id: 2,
      slug: 'tenant_admin',
      name: 'Tenant Admin',
      description: 'Tenant Admin....'
    });

    const admin = await Role.create({
      id: 3,
      slug: 'admin',
      name: 'Admin',
      description: 'Admin....'
    });

    const superUser = await User.create({
      id: uuidv4(),
      username: 'iahsanjaved',
      email: 'i@test.com',
      password: 'helloworld!',
      name: 'Ahsan Javed',
      status: 1,
      gender: 1,
      role_id: superAdmin.id,
      organization_id: organization.id
    });


    const tenantUser = await User.create({
      id: uuidv4(),
      username: 'fawad',
      email: 'f@test.com',
      password: 'helloworld!',
      name: 'Fawad Kareem',
      status: 1,
      gender: 1,
      role_id: tenantAdmin.id,
      organization_id: organization.id
    });



    const adminUser = await User.create({
      id: uuidv4(),
      username: 'junaid',
      email: 'j@test.com',
      password: 'helloworld!',
      name: 'Junaid Raja',
      status: 1,    
      gender: 0,  
      role_id: admin.id,
      organization_id: organization.id
    });

    const locJeddah = await Location.create({
      latitude: -0.62616,
      longitude: -55.6666,
      google_map_url: 'ddddddddd',
      organization_id: organization.id
    })
    await locJeddah.languages().attach(['en'], (row) => {
        row.name = "Jeddah"
    })

    const device = await Device.create({
      id: uuidv4(),
      status: 1,
      location_id: locJeddah.id
    })
    
    await device.languages().attach(['en'], (row) => {
      row.name = "Central Device",
      row.description = "Desc....."
    })

  }
}

module.exports = CreateUserSeeder
