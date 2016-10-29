var CronJob = require('cron').CronJob
var request = require('request')
var api = require('sunlight-congress-api')
var RepBio = require('../models/user.js')
var apiKey = 'ece3e4fd5f1ad6247f8551a0206c6c41'
var osLegUrl = 'https://www.opensecrets.org/api/?method=getLegislators&id='
var osMoneyUrl = 'https://www.opensecrets.org/api/?method=candIndustry&cid='
var voteSmartUrl = 'http://api.votesmart.org/Votes.getByOfficial'
var sunlightUrl = 'https://congress.api.sunlightfoundation.com/bills?'
// TODO: REMOVE API KEY AND STORE EXTERNALLY
api.init('b524bb3f77b64fc89bd61b4d551e95a2')

var UserController = function () {
  var legislatorData = []
  // new CronJob('00 30 11 * * 1-5', function () {
  // }, null, true, 'America/Los_Angeles')
  function saveLegislatorsToMongo () {
    for (var i = 0; i < legislatorData.length; i++) {
      console.log('SAVING LEGISLATORS...', legislatorData[i].bioguide_id)
      console.log('i from inside', i)
      var newRepBio = RepBio({
        bioguide_id: legislatorData[i].bioguide_id,
        birthday: legislatorData[i].birthday,
        chamber: legislatorData[i].chamber,
        contact_form: legislatorData[i].contact_form,
        crp_id: legislatorData[i].crp_id,
        district: legislatorData[i].district,
        facebook_id: legislatorData[i].facebook_id,
        fax: legislatorData[i].fax,
        fec_ids: legislatorData[i].fec_ids,
        first_name: legislatorData[i].first_name,
        gender: legislatorData[i].gender,
        govtrack_id: legislatorData[i].govtrack_id,
        in_office: legislatorData[i].in_office,
        last_name: legislatorData[i].last_name,
        leadership_role: legislatorData[i].leadership_role,
        middle_name: legislatorData[i].middle_name,
        name_suffix: legislatorData[i].name_suffix,
        nickname: legislatorData[i].nickname,
        oc_email: legislatorData[i].oc_email,
        ocd_id: legislatorData[i].ocd_id,
        office: legislatorData[i].office,
        party: legislatorData[i].party,
        phone: legislatorData[i].phone,
        state: legislatorData[i].state,
        state_name: legislatorData[i].state_name,
        term_end: legislatorData[i].term_end,
        term_start: legislatorData[i].term_start,
        thomas_id: legislatorData[i].thomas_id,
        title: legislatorData[i].title,
        twitter_id: legislatorData[i].twitter_id,
        website: legislatorData[i].website
      })
      newRepBio.save(function (err) {
        if (err) {
          console.log('ERROR!', err)
        } else {
          console.log('User created!')
        }
      })
    }
  }

  function getLegislators () {
    var legislators = api.legislators()
    for (var i = 0; i < 35; i++) {
      legislators.next(function (data) {
        for (var k = 0; k < data.results.length; k++) {
          legislatorData.push(data.results[k])
          // console.log('legislator length', data.results[k].bioguide_id)
        }
      }, function (error) {
        console.log('error in next function')
      })
    }
    setTimeout(function () {
      saveLegislatorsToMongo()
      // console.log('legislator length after loop', legislatorData.length)
    }, 500)
  }
  getLegislators()

  // UserController.prototype.askMongo = function (req, res) {
  //   Products.find(function (err, docs) {
  //     if (err) {
  //       console.log('error')
  //     } else {
  //       // console.log(docs)
  //       res.send(docs)
  //     }
  //   })

  UserController.prototype.getStateMembers = function (req, res) {
  // var success = function (data) {
  //   console.log('success data', data)
  // }
  // api.votes().filter('year', '2012').call(success)
  // TODO: GET OBJECTS FROM MONGO
    // api.legislators().call(function (data) {
    //   console.log(data.status)
    //   if (data.status != 'error') {
    //     res.send(data)
    //     console.log('StateReps is firing!')
    //   } else {
    //     return res.sendStatus(400)
    //   }
    // })
  },

  UserController.prototype.getMemberBio = function (req, res) {
    var options = {
      url: osLegUrl + req.params.candidate + '&apikey=' + apiKey2 + '&output=json',
      json: true
    }
    // console.log(req.params.candidate)
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(response)
        var bioMaker = ({
          candidateId: body.response.legislator['@attributes'].cid,
          fullName: body.response.legislator['@attributes'].firstlast,
          lastName: body.response.legislator['@attributes'].lastname,
          party: body.response.legislator['@attributes'].party,
          birthday: body.response.legislator['@attributes'].birthdate,
          termStart: body.response.legislator['@attributes'].first_elected,
          phone: body.response.legislator['@attributes'].phone,
          website: body.response.legislator['@attributes'].website,
          contactForm: body.response.legislator['@attributes'].webform,
          fax: body.response.legislator['@attributes'].fax,
          voteSmartId: body.response.legislator['@attributes'].votesmart_id,
          uniqueId: body.response.legislator['@attributes'].bioguide_id
        })
        res.send(bioMaker)
      } else {
        res.send('API request failed :[ ')
      }
    })
  },

  UserController.prototype.getMemberMoney = function (req, res) {
    var options = {
      url: osMoneyUrl + req.params.candidate + '&cycle=2014&apikey=' + apiKey2 + '&output=json',
      json: true
    }
    var contributions = []
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body.response.industries.industry)
        for (var i = 0; i < body.response.industries.industry.length; i++) {
          contributions.push(body.response.industries.industry[i]['@attributes'])
        }
        res.send(contributions)
      } else {
        res.send('API request failed :[ ')
      }
    })
  },

  UserController.prototype.getMemberVotes = function (req, res) {
    var apiKeyForSunlight = 'fe73564a6d8c4ca68e6f5b9ea7ca0e88'
    var uniqueId = req.params.uniqueId
    var sponsor = 'sponsor_id='
    var coSponsor = 'co_sponsor_id='
    var sponsorGet = {
      url: sunlightUrl + sponsor + uniqueId + '&apikey=' + apiKeyForSunlight,
      json: true
    }
    var sponsoredBills = []
    request(sponsorGet, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body.results)
        for (var i = 0; i < body.results.length; i++) {
          var billInformation = {
            BillId: body.results[i].bill_id,
            Chamber: body.results[i].chamber,
            IntroducedOn: body.results[i].introduced_on,
            OfficialTitle: body.results[i].official_title,
            Info: body.results[i].urls.govtrack
          }
          sponsoredBills.push(billInformation)
        // console.log(billInformation)
        }
        console.log(sponsoredBills.length)
        res.send(sponsoredBills)
      } else {
        res.send('API request failed :[ ')
      }
    })
  }
}

module.exports = UserController

// TEST:  http://www.opensecrets.org/api/?method=getLegislators&id=N00033474&apikey=51aa68c0c15797ab67f347add9f9d73a
// http://www.opensecrets.org/api/?method=getLegislators&id=N00033474&apikey=51aa68c0c15797ab67f347add9f9d73a
// http://www.opensecrets.org/api/?method=candIndustry&cid=N00033474&cycle=2014&apikey=51aa68c0c15797ab67f347add9f9d73a&output=json
// http://api.votesmart.org/CandidateBio.getBio?key=<your_key>&candidateId=9490
