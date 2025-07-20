
function doGet(e) {
  let page = e.parameter.page || 'index';
  let htmlTemplate = HtmlService.createTemplateFromFile(page);
  let htmlOutput = htmlTemplate.evaluate();

  htmlOutput
    .setTitle(getPageTitle(page))
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return htmlOutput;
}

function getPageTitle(page) {
  switch (page) {
    case 'form':
      return 'แบบสอบถามข้อมูลส่วนบุคคล';
    case 'know':
      return 'แบบประเมินสุขภาพโรคหลอดเลือดหัวใจ';
    case 'game':
      return 'Meowdicine Farm';
    case 'learn':
      return 'คลังความรู้เพิ่มเติม';
    case 'index':
    default:
      return 'MeowHeart';
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }

  function getUrl(){
  var url = ScriptApp.getService().getUrl()
  return url
  }
  
  function processForm(formObject){
  var ss= SpreadsheetApp.openById('1Wlnii1StySbMlb-2_OPjhBpdZ5OwTXj84PC7-bR5NAo');
  var ws=ss.getSheets()[0];
  var data=ws.getDataRange().getValues();

  var alreadyExists=data.some(function(row) {
    return row[0] === formObject.first_name && row[1] === formObject.last_name;
  }); 

  if (alreadyExists) {
    return {status:"duplicate"};
  }

  ws.appendRow([
    formObject.first_name,
    formObject.last_name,
    formObject.gender,
      formObject.age,
      formObject.marital_status,
      formObject.education,
      formObject.income,
      formObject.disease1,
      formObject.disease_check11,
      formObject.disease_check22,
      formObject.disease_check33,
      formObject.period,
      formObject.alcohol,
      formObject.alcohol2,
      formObject.smoke,
      formObject.smoke2,
      formObject.disease_,
      formObject.disease_check1,
      formObject.disease_check2,
      formObject.disease_check3,
      formObject.disease_check4,
      formObject.disease_check5,
      formObject.drug,
      formObject.type,
  ]);
    return {status:"success"};
}

function saveAssessmentResults(formObject) {
  var ss = SpreadsheetApp.openById('1Wlnii1StySbMlb-2_OPjhBpdZ5OwTXj84PC7-bR5NAo');
  var ws = ss.getSheets()[0];
  var data = ws.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === formObject.first_name && data[i][1] === formObject.last_name) {

      ws.getRange(i + 1, 25).setValue(formObject.behavior_score);
      ws.getRange(i + 1, 26).setValue(formObject.behavior_risk);
      ws.getRange(i + 1, 27).setValue(formObject.knowledge_score);
      ws.getRange(i + 1, 28).setValue(formObject.knowledge_risk);
      return { status: "updated" };
    }
  }

  return { status: "not found" };
}

const SHEET_ID = '1KLJNFcQjiE8V3rKEE7URBP2iX9CMynN9q6TuMRheSV4';
const PLAYER_SHEET_NAME = 'Players'; // แยกชีตจากแบบฟอร์ม

function getOrCreatePlayer(name) {
 Logger.log("กำลังโหลดผู้เล่น:" + name);

  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(PLAYER_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(PLAYER_SHEET_NAME);
    sheet.appendRow(['name', 'data']); // header
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === name) {
      return JSON.parse(data[i][1]);
    }
  }


const newPlayer = {
  coin: 100,
  level: 1,
  exp: 0,
  inventory: {
        rice: 0, riceSeed: 0, corn: 0, cornSeed: 0,
        lettuce: 0, lettuceSeed: 0, pumpkin: 0, pumpkinSeed: 0,
        garlic: 0, garlicSeed: 0, tomato: 0, tomatoSeed: 0,
        chili: 0, chiliSeed: 0, eggplant: 0, eggplantSeed: 0,
        carrot: 0, carrotSeed: 0, mushroom: 0, mushroomSeed: 0,
        potato: 0, potatoSeed: 0, cabbage: 0, cabbageSeed: 0,
        broccoli: 0, broccoliSeed: 0,
  },
  freeCoinCount: 0,
  totalFreeCoin: 0,
  lastFreeCoinDate: null, 
  dailySalesCount: 0,
  lastSellDate: null,
  plots: Array.from({ length: 24 }, (_, idx) => ({
    unlockedSlots: idx === 0 ? 1 : 0,
    planted: [false, false, false, false]
  })),
  quests: [  // ✅ เพิ่มเควส
  { id: 1, title: "ปลูกข้าวสาลี 4 ช่อง", done: false, rewardExp: 20, rewardCoin: 0 },
  { id: 2, title: "ขายผักครั้งแรก", done: false, rewardExp: 10, rewardCoin: 10 },
  { id: 3, title: "ปลูกผัก 3 ชนิด", done: false, rewardExp: 10, rewardCoin: 10 },
  { id: 4, title: "เก็บเกี่ยวผักสำเร็จ 5 ผล", done: false, rewardExp: 15, rewardCoin: 10 },
  { id: 5, title: "รับเหรียญฟรีครั้งแรก", done: false, rewardExp: 10, rewardCoin: 5 },
  { id: 6, title: "ปลดล็อกครบ 4 ช่องในแปลงแรก", done: false, rewardExp: 20, rewardCoin: 10 },
  { id: 7, title: "ปลดล็อกแปลงเพิ่ม 1 แปลง", done: false, rewardExp: 10, rewardCoin: 10 },
  { id: 8, title: "ปลูกผักครบ 5 ชนิด", done: false, rewardExp: 20, rewardCoin: 10 },
  { id: 9, title: "ขายผัก 10 ครั้ง", done: false, rewardExp: 25, rewardCoin: 20 },
  { id: 10, title: "รับเหรียญฟรี 3 ครั้ง", done: false, rewardExp: 15, rewardCoin: 10 },
  { id: 11, title: "สะสมเงิน 200 บาท", done: false, rewardExp: 20, rewardCoin: 0 },
  { id: 12, title: "เก็บผักในคลัง 20 ชิ้น", done: false, rewardExp: 20, rewardCoin: 10 },
  { id: 13, title: "ปลูกผักครบ 8 ชนิด", done: false, rewardExp: 30, rewardCoin: 20 },
  { id: 14, title: "ปลดล็อกแปลงครบ 3 แปลง", done: false, rewardExp: 25, rewardCoin: 10 },
  { id: 15, title: "ถึงเลเวล 3", done: false, rewardExp: 30, rewardCoin: 20 },
  { id: 16, title: "ขายผักครบ 20 ครั้ง", done: false, rewardExp: 40, rewardCoin: 20 },
  { id: 17, title: "รับเหรียญฟรีครบ 6 ครั้ง", done: false, rewardExp: 30, rewardCoin: 10 },
  { id: 18, title: "เก็บผักในคลังครบ 50 ชิ้น", done: false, rewardExp: 40, rewardCoin: 30 },
  { id: 19, title: "ส่งอาหารให้แมวครั้งแรก", done: false, rewardExp: 15, rewardCoin: 10 },
  { id: 20, title: "ส่งอาหารให้แมวครบ 5 ตัว", done: false, rewardExp: 30, rewardCoin: 15 },
  { id: 21, title: "ปรุงอาหารครั้งแรก", done: false, rewardExp: 10, rewardCoin: 5 },
  { id: 22, title: "ปรุงอาหารครบ 10 ถ้วย", done: false, rewardExp: 25, rewardCoin: 15 },
  ],
  herbalInventory: {},
  answeredQuestions: [],
  answeredFreeCoins: []
};

  sheet.appendRow([name, JSON.stringify(newPlayer)]);
  return newPlayer;
}

function savePlayer(name, player) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(PLAYER_SHEET_NAME);
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === name) {
      sheet.getRange(i + 1, 2).setValue(JSON.stringify(player));
      return;
    }
  }

  sheet.appendRow([name, JSON.stringify(player)]);
}
