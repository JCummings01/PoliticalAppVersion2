var request = require('request')
// var RepBio = require('../models/bio.js')
var apiKey = '51aa68c0c15797ab67f347add9f9d73a'
var apiKey2 = '53419fda5eab02a110c479b441665e10'
var apiKey3 = '0f129237b224a1237a612b6ab64a1afb'
var osLegUrl = 'https://www.opensecrets.org/api/?method=getLegislators&id='
var osMoneyUrl = 'https://www.opensecrets.org/api/?method=candIndustry&cid='
var voteSmartUrl = 'http://api.votesmart.org/Votes.getByOfficial'
var sunlightUrl = 'https://congress.api.sunlightfoundation.com/bills?'

var UserController = function () {
  // UserController.prototype.askMongo = function (req, res) {
  //   Products.find(function (err, docs) {
  //     if (err) {
  //       console.log('error')
  //     } else {
  //       // console.log(docs)
  //       res.send(docs)
  //     }
  //   })
  // }

  UserController.prototype.getStateMembers = function (req, res) {
    var options = {
      url: osLegUrl + req.params.id + '&apikey=' + apiKey2 + '&output=json',
      json: true,
    }
    var stateReps = []
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // var reps = response.body.response.legislator['@attributes']
        var repArray = []
        for (var i = 0; i < body.response.legislator.length; i++) {
          repArray.push(response.body.response.legislator[i])

          var repMaker = ({
            candidateId: repArray[i]['@attributes'].cid,
            fullName: repArray[i]['@attributes'].firstlast,
            lastName: repArray[i]['@attributes'].lastname,
            party: repArray[i]['@attributes'].party,
            state: req.params.id,
            birthday: repArray[i]['@attributes'].birthdate,
            termStart: repArray[i]['@attributes'].first_elected,
            phone: repArray[i]['@attributes'].phone,
            website: repArray[i]['@attributes'].website,
            contactForm: repArray[i]['@attributes'].webform,
            fax: repArray[i]['@attributes'].fax,
            voteSmartId: repArray[i]['@attributes'].votesmart_id,
            uniqueId: repArray[i]['@attributes'].bioguide_id
          })
          stateReps.push(repMaker)
        }

      } else {
        return res.sendStatus(400)

      }
      res.send(stateReps)
    console.log('StateReps is firing!')
    })
  },

  UserController.prototype.getMemberBio = function (req, res) {
    var options = {
      url: osLegUrl + req.params.candidate + '&apikey=' + apiKey2 + '&output=json',
      json: true,
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
      json: true,
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
      json: true,
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
// TEST:  http://www.opensecrets.org/api/?method=getLegislators&id=N00033474&apikey=51aa68c0c15797ab67f347add9f9d73a
// http://www.opensecrets.org/api/?method=getLegislators&id=N00033474&apikey=51aa68c0c15797ab67f347add9f9d73a
// http://www.opensecrets.org/api/?method=candIndustry&cid=N00033474&cycle=2014&apikey=51aa68c0c15797ab67f347add9f9d73a&output=json
// http://api.votesmart.org/CandidateBio.getBio?key=<your_key>&candidateId=9490
}

module.exports = UserController
