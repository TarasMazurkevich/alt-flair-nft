//region Imports
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
const router = express.Router();

const admin = require('firebase-admin');
const serviceAccount = require('./public/alt-flair-nft-firebase-adminsdk-x7ei5-0980b63d12.json');
//endregion

//region Config
let PORT = process.env.PORT || 3000;

const app = express()
    .set('port', PORT)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
//endregion

//region Firebase initialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alt-flair-nft-default-rtdb.firebaseio.com"
})

const firebaseDb = admin.firestore()
//endregion

//region Classes
class NftData {
  constructor({ name = '', image = ''}) {
    this.name = name;
    this.image = image;
  }
}
//endregion

//region API
app.get('/', function(req, res) {
  console.log('success')
  res.send('Get ready for OpenSea research! Delivered by deca4');
})

app.get('/api/token/:id', async function(req, res) {
  const fireDoc = await firebaseDb.collection('nfts').doc(req.params.id).get();
  const nftData = new NftData(await fireDoc.data());

  res.send(nftData)
})
//endregion

app.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port') + '/api/token/jhLOWDD0Ui13SdbXEDubfDYusgsxOEKajbtuscLP3xuQrsUbMu0jF4KhhY3BiwZtHfnAAq0GWYzXtV03Cvje=w1920-h969');
})

module.exports = app;
