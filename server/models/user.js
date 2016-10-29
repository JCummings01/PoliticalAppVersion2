var mongoose = require('mongoose')
// var findOrCreate = require('mongoose-findorcreate')

var userSchema = new mongoose.Schema({
  bioguide_id: String,
  birthday: String,
  chamber: String,
  contact_form: String,
  crp_id: String,
  district: Number,
  facebook_id: String,
  fax: String,
  fec_ids: Object,
  first_name: String,
  gender: String,
  govtrack_id: String,
  in_office: Boolean,
  last_name: String,
  leadership_role: String,
  middle_name: String,
  name_suffix: String,
  nickname: String,
  oc_email: String,
  ocd_id: String,
  office: String,
  party: String,
  phone: String,
  state: String,
  state_name: String,
  term_end: String,
  term_start: String,
  thomas_id: String,
  title: String,
  twitter_id: String,
  website: String
})

// userSchema.plugin(findOrCreate)

module.exports = mongoose.model('user', userSchema)
