var expect = require('chai').expect;
var validateOther = require('.././js/validate.js');

describe('validateOther',function() {

  it('should check to see if text input is empty',function() {

    var field = {
      id: "other_info",
      value: ""
    }

    expect(validateOther(field)).to.be.true;

  })

})
