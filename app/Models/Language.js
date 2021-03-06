'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Language extends Model {
    organizations () {
        return this
          .belongsToMany('App/Models/Organization')
          .pivotTable('organization_languages')
          .withPivot(['name'])
          .withTimestamps()
    }

    locations () {
      return this
        .belongsToMany('App/Models/Location')
        .pivotTable('location_languages')
        .withPivot(['name'])
        .withTimestamps()
    }

    devices () {
      return this
        .belongsToMany('App/Models/Device')
        .pivotTable('device_languages')
        .withPivot(['name', 'description'])
        .withTimestamps()
    }

    organizationsSupport () {
        return this
          .belongsToMany('App/Models/Organization', 'language_id', 'organization_id', 'id', 'id')
          .pivotTable('organization_lang_supports')
    }

}

module.exports = Language
