'use strict'

class UpdateLocation {
  get rules () {
    const languageId = this.ctx.params.id
    return {
      'name': 'required|max:100',
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'max': 'The {{ field }} must not exceed than {{ argument.0 }} characters.',
    }
  }


  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = UpdateLocation
