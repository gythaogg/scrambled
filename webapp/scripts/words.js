/*
 *words.js
 */
var app = angular.module('scrambledApp', []);

app.controller('scrambledCtrl', function($scope) {
    $scope.numQ = 10;
    $scope.thisQNum = 0;
    $scope.wordSet = get_random_words($scope.numQ)
    get_next_word();
    $scope.score = 0;
    
    $scope.checkGuess = function(){
	if ($scope.guess.toLowerCase() == $scope.randomWord.toLowerCase()){
	    $scope.score++;
	    if ($scope.thisQNum < $scope.numQ){
		get_next_word();
	    }
	}
    }

    $scope.skipWord = function(){
	if ($scope.guess.toLowerCase() == $scope.randomWord.toLowerCase()){
	    $scope.score++;
	}
	if ($scope.thisQNum < $scope.numQ){
	    get_next_word();
	}
    }
    
    function get_next_word(){
	$scope.randomWord = $scope.wordSet[$scope.thisQNum];
	console.debug($scope.randomWord); 
	$scope.scrambledWord =  get_scrambled_word($scope.randomWord);
	$scope.thisQNum++;
	$scope.guess = '';
    };
});


function get_random_words(n){
    const shuffled = wordlist.sort(() => .5 - Math.random());// shuffle  
    return shuffled.slice(0,n); //get sub-array of first n elements AFTER shuffle
}
    
function shuffle_FisherYates(array) {
    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    //http://www.itsmycodeblog.com/shuffling-a-javascript-array/
    var currentIndex = array.length, temporaryValue, randomIndex ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
    }
    return array;
}


function get_random_word(){
    random_index = Math.floor(Math.random()*wordlist.length);
    return wordlist[random_index].toLowerCase();
};


function get_scrambled_word(random_word){
    random_word_middle = random_word.slice(1, -1)
    // Sort letters in the middle alphabetically
    middle_shuffled = random_word_middle.split('').sort().join('')
    console.debug('alpha: ' + middle_shuffled)

    if (middle_shuffled == random_word_middle){
	//If alphabetical sorting doesn't scramble, sort randomly
	middle_shuffled = random_word_middle.split('').sort(function(a, b){return 0.5 - Math.random()}).join('')
	console.debug('random: ' + middle_shuffled)
    }
    if (middle_shuffled == random_word_middle){
	//if random sort also doesn't scramble, sort using Fisher-Yates shuffle method
	middle_shuffled = shuffle_FisherYates(random_word_middle.split('')).join('')
	console.debug('FisherYates: ' + middle_shuffled)
    }
    scrambled = random_word[0].concat(
	middle_shuffled,
	random_word[random_word.length - 1])
    return scrambled
};


var wordlist=["abandon","ability","abortion","about","above","abroad","absence","absolute","absolutely","absorb","abuse","academic","accept","access","accident","accompany","accomplish","according","account","accurate","accuse","achieve","achievement","acknowledge","acquire","across","action","active","activist","activity","actor","actress","actual","actually","adapt","addition","additional","address","adequate","adjust","adjustment","administration","administrator","admire","admission","admit","adolescent","adopt","adult","advance","advanced","advantage","adventure","advertising","advice","advise","adviser","advocate","affair","affect","afford","afraid","African","after","afternoon","again","against","agency","agenda","agent","aggressive","agree","agreement","agricultural","ahead","aircraft","airline","airport","album","alcohol","alive","alliance","allow","almost","alone","along","already","alter","alternative","although","always","amazing","American","among","amount","analysis","analyst","analyze","ancient","anger","angle","angry","animal","anniversary","announce","annual","another","answer","anticipate","anxiety","anybody","anymore","anyone","anything","anyway","anywhere","apart","apartment","apparent","apparently","appeal","appear","appearance","apple","application","apply","appoint","appointment","appreciate","approach","appropriate","approval","approve","approximately","architect","argue","argument","arise","armed","around","arrange","arrangement","arrest","arrival","arrive","article","artist","artistic","Asian","aside","asleep","aspect","assault","assert","assess","assessment","asset","assign","assignment","assist","assistance","assistant","associate","association","assume","assumption","assure","athlete","athletic","atmosphere","attach","attack","attempt","attend","attention","attitude","attorney","attract","attractive","attribute","audience","author","authority","available","average","avoid","award","aware","awareness","awful","background","badly","balance","barely","barrel","barrier","baseball","basic","basically","basis","basket","basketball","bathroom","battery","battle","beach","beautiful","beauty","because","become","bedroom","before","begin","beginning","behavior","behind","being","belief","believe","belong","below","bench","beneath","benefit","beside","besides","better","between","beyond","Bible","billion","biological","birth","birthday","black","blade","blame","blanket","blind","block","blood","board","bombing","border","borrow","bother","bottle","bottom","boundary","boyfriend","brain","branch","brand","bread","break","breakfast","breast","breath","breathe","brick","bridge","brief","briefly","bright","brilliant","bring","British","broad","broken","brother","brown","brush","budget","build","building","bullet","bunch","burden","business","butter","button","buyer","cabin","cabinet","cable","calculate","camera","campaign","campus","Canadian","cancer","candidate","capability","capable","capacity","capital","captain","capture","carbon","career","careful","carefully","carrier","carry","catch","category","Catholic","cause","ceiling","celebrate","celebration","celebrity","center","central","century","ceremony","certain","certainly","chain","chair","chairman","challenge","chamber","champion","championship","chance","change","changing","channel","chapter","character","characteristic","characterize","charge","charity","chart","chase","cheap","check","cheek","cheese","chemical","chest","chicken","chief","child","childhood","Chinese","chocolate","choice","cholesterol","choose","Christian","Christmas","church","cigarette","circle","circumstance","citizen","civil","civilian","claim","class","classic","classroom","clean","clear","clearly","client","climate","climb","clinic","clinical","clock","close","closely","closer","clothes","clothing","cloud","cluster","coach","coalition","coast","coffee","cognitive","collapse","colleague","collect","collection","collective","college","colonial","color","column","combination","combine","comedy","comfort","comfortable","command","commander","comment","commercial","commission","commit","commitment","committee","common","communicate","communication","community","company","compare","comparison","compete","competition","competitive","competitor","complain","complaint","complete","completely","complex","complicated","component","compose","composition","comprehensive","computer","concentrate","concentration","concept","concern","concerned","concert","conclude","conclusion","concrete","condition","conduct","conference","confidence","confident","confirm","conflict","confront","confusion","Congress","congressional","connect","connection","consciousness","consensus","consequence","conservative","consider","considerable","consideration","consist","consistent","constant","constantly","constitute","constitutional","construct","construction","consultant","consume","consumer","consumption","contact","contain","container","contemporary","content","contest","context","continue","continued","contract","contrast","contribute","contribution","control","controversial","controversy","convention","conventional","conversation","convert","conviction","convince","cookie","cooking","cooperation","corner","corporate","corporation","correct","correspondent","cotton","couch","could","council","counselor","count","counter","country","county","couple","courage","course","court","cousin","cover","coverage","crack","craft","crash","crazy","cream","create","creation","creative","creature","credit","crime","criminal","crisis","criteria","critic","critical","criticism","criticize","cross","crowd","crucial","cultural","culture","curious","current","currently","curriculum","custom","customer","cycle","daily","damage","dance","danger","dangerous","darkness","daughter","dealer","death","debate","decade","decide","decision","declare","decline","decrease","deeply","defeat","defend","defendant","defense","defensive","deficit","define","definitely","definition","degree","delay","deliver","delivery","demand","democracy","Democrat","democratic","demonstrate","demonstration","department","depend","dependent","depending","depict","depression","depth","deputy","derive","describe","description","desert","deserve","design","designer","desire","desperate","despite","destroy","destruction","detail","detailed","detect","determine","develop","developing","development","device","devote","dialogue","differ","difference","different","differently","difficult","difficulty","digital","dimension","dining","dinner","direct","direction","directly","director","dirty","disability","disagree","disappear","disaster","discipline","discourse","discover","discovery","discrimination","discuss","discussion","disease","dismiss","disorder","display","dispute","distance","distant","distinct","distinction","distinguish","distribute","distribution","district","diverse","diversity","divide","division","divorce","doctor","document","domestic","dominant","dominate","double","doubt","downtown","dozen","draft","drama","dramatic","dramatically","drawing","dream","dress","drink","drive","driver","during","eager","early","earnings","earth","easily","eastern","economic","economics","economist","economy","edition","editor","educate","education","educational","educator","effect","effective","effectively","efficiency","efficient","effort","eight","either","elderly","elect","election","electric","electricity","electronic","element","elementary","eliminate","elite","elsewhere","embrace","emerge","emergency","emission","emotion","emotional","emphasis","emphasize","employ","employee","employer","employment","empty","enable","encounter","encourage","enemy","energy","enforcement","engage","engine","engineer","engineering","English","enhance","enjoy","enormous","enough","ensure","enter","enterprise","entertainment","entire","entirely","entrance","entry","environment","environmental","episode","equal","equally","equipment","error","escape","especially","essay","essential","essentially","establish","establishment","estate","estimate","ethics","ethnic","European","evaluate","evaluation","evening","event","eventually","every","everybody","everyday","everyone","everything","everywhere","evidence","evolution","evolve","exact","exactly","examination","examine","example","exceed","excellent","except","exception","exchange","exciting","executive","exercise","exhibit","exhibition","exist","existence","existing","expand","expansion","expect","expectation","expense","expensive","experience","experiment","expert","explain","explanation","explode","explore","explosion","expose","exposure","express","expression","extend","extension","extensive","extent","external","extra","extraordinary","extreme","extremely","fabric","facility","factor","factory","faculty","failure","fairly","faith","false","familiar","family","famous","fantasy","farmer","fashion","father","fault","favor","favorite","feature","federal","feeling","fellow","female","fence","fewer","fiber","fiction","field","fifteen","fifth","fifty","fight","fighter","fighting","figure","final","finally","finance","financial","finding","finger","finish","first","fishing","fitness","flame","flavor","flesh","flight","float","floor","flower","focus","follow","following","football","force","foreign","forest","forever","forget","formal","formation","former","formula","forth","fortune","forward","found","foundation","founder","fourth","frame","framework","freedom","freeze","French","frequency","frequent","frequently","fresh","friend","friendly","friendship","front","fruit","frustration","fully","function","fundamental","funding","funeral","funny","furniture","furthermore","future","galaxy","gallery","garage","garden","garlic","gather","gender","general","generally","generate","generation","genetic","gentleman","gently","German","gesture","ghost","giant","gifted","girlfriend","given","glance","glass","global","glove","golden","government","governor","grade","gradually","graduate","grain","grand","grandfather","grandmother","grant","grass","grave","great","greatest","green","grocery","ground","group","growing","growth","guarantee","guard","guess","guest","guide","guideline","guilty","habit","habitat","handful","handle","happen","happy","hardly","headline","headquarters","health","healthy","hearing","heart","heaven","heavily","heavy","height","helicopter","hello","helpful","heritage","herself","highlight","highly","highway","himself","historian","historic","historical","history","holiday","homeless","honest","honey","honor","horizon","horror","horse","hospital","hotel","house","household","housing","however","human","humor","hundred","hungry","hunter","hunting","husband","hypothesis","ideal","identification","identify","identity","ignore","illegal","illness","illustrate","image","imagination","imagine","immediate","immediately","immigrant","immigration","impact","implement","implication","imply","importance","important","impose","impossible","impress","impression","impressive","improve","improvement","incentive","incident","include","including","income","incorporate","increase","increased","increasing","increasingly","incredible","indeed","independence","independent","index","Indian","indicate","indication","individual","industrial","industry","infant","infection","inflation","influence","inform","information","ingredient","initial","initially","initiative","injury","inner","innocent","inquiry","inside","insight","insist","inspire","install","instance","instead","institution","institutional","instruction","instructor","instrument","insurance","intellectual","intelligence","intend","intense","intensity","intention","interaction","interest","interested","interesting","internal","international","Internet","interpret","interpretation","intervention","interview","introduce","introduction","invasion","invest","investigate","investigation","investigator","investment","investor","invite","involve","involved","involvement","Iraqi","Irish","Islamic","island","Israeli","issue","Italian","itself","jacket","Japanese","Jewish","joint","journal","journalist","journey","judge","judgment","juice","junior","justice","justify","killer","killing","kitchen","knife","knock","knowledge","label","labor","laboratory","landscape","language","large","largely","later","Latin","latter","laugh","launch","lawsuit","lawyer","layer","leader","leadership","leading","league","learn","learning","least","leather","leave","legacy","legal","legend","legislation","legitimate","lemon","length","lesson","letter","level","liberal","library","license","lifestyle","lifetime","light","likely","limit","limitation","limited","listen","literally","literary","literature","little","living","local","locate","location","loose","lovely","lover","lower","lucky","lunch","machine","magazine","mainly","maintain","maintenance","major","majority","maker","makeup","manage","management","manager","manner","manufacturer","manufacturing","margin","market","marketing","marriage","married","marry","massive","master","match","material","matter","maybe","mayor","meaning","meanwhile","measure","measurement","mechanism","media","medical","medication","medicine","medium","meeting","member","membership","memory","mental","mention","merely","message","metal","meter","method","Mexican","middle","might","military","million","minister","minor","minority","minute","miracle","mirror","missile","mission","mistake","mixture","model","moderate","modern","modest","moment","money","monitor","month","moral","moreover","morning","mortgage","mostly","mother","motion","motivation","motor","mount","mountain","mouse","mouth","movement","movie","multiple","murder","muscle","museum","music","musical","musician","Muslim","mutual","myself","mystery","naked","narrative","narrow","nation","national","native","natural","naturally","nature","nearby","nearly","necessarily","necessary","negative","negotiate","negotiation","neighbor","neighborhood","neither","nerve","nervous","network","never","nevertheless","newly","newspaper","night","nobody","noise","nomination","nonetheless","normal","normally","north","northern","nothing","notice","notion","novel","nowhere","nuclear","number","numerous","nurse","object","objective","obligation","observation","observe","observer","obtain","obvious","obviously","occasion","occasionally","occupation","occupy","occur","ocean","offense","offensive","offer","office","officer","official","often","Olympic","ongoing","onion","online","opening","operate","operating","operation","operator","opinion","opponent","opportunity","oppose","opposite","opposition","option","orange","order","ordinary","organic","organization","organize","orientation","origin","original","originally","other","others","otherwise","ought","ourselves","outcome","outside","overall","overcome","overlook","owner","package","painful","paint","painter","painting","Palestinian","panel","paper","parent","parking","participant","participate","participation","particular","particularly","partly","partner","partnership","party","passage","passenger","passion","patch","patient","pattern","pause","payment","peace","penalty","people","pepper","perceive","percentage","perception","perfect","perfectly","perform","performance","perhaps","period","permanent","permission","permit","person","personal","personality","personally","personnel","perspective","persuade","phase","phenomenon","philosophy","phone","photo","photograph","photographer","phrase","physical","physically","physician","piano","picture","piece","pilot","pitch","place","plane","planet","planning","plant","plastic","plate","platform","player","please","pleasure","plenty","pocket","poetry","point","police","policy","political","politically","politician","politics","pollution","popular","population","porch","portion","portrait","portray","position","positive","possess","possibility","possible","possibly","potato","potential","potentially","pound","poverty","powder","power","powerful","practical","practice","prayer","precisely","predict","prefer","preference","pregnancy","pregnant","preparation","prepare","prescription","presence","present","presentation","preserve","president","presidential","press","pressure","pretend","pretty","prevent","previous","previously","price","pride","priest","primarily","primary","prime","principal","principle","print","prior","priority","prison","prisoner","privacy","private","probably","problem","procedure","proceed","process","produce","producer","product","production","profession","professional","professor","profile","profit","program","progress","project","prominent","promise","promote","prompt","proof","proper","properly","property","proportion","proposal","propose","proposed","prosecutor","prospect","protect","protection","protein","protest","proud","prove","provide","provider","province","provision","psychological","psychologist","psychology","public","publication","publicly","publish","publisher","punishment","purchase","purpose","pursue","qualify","quality","quarter","quarterback","question","quick","quickly","quiet","quietly","quite","quote","racial","radical","radio","raise","range","rapid","rapidly","rarely","rather","rating","ratio","reach","react","reaction","reader","reading","ready","reality","realize","really","reason","reasonable","recall","receive","recent","recently","recipe","recognition","recognize","recommend","recommendation","record","recording","recover","recovery","recruit","reduce","reduction","refer","reference","reflect","reflection","reform","refugee","refuse","regard","regarding","regardless","regime","region","regional","register","regular","regularly","regulate","regulation","reinforce","reject","relate","relation","relationship","relative","relatively","relax","release","relevant","relief","religion","religious","remain","remaining","remarkable","remember","remind","remote","remove","repeat","repeatedly","replace","reply","report","reporter","represent","representation","representative","Republican","reputation","request","require","requirement","research","researcher","resemble","reservation","resident","resist","resistance","resolution","resolve","resort","resource","respect","respond","respondent","response","responsibility","responsible","restaurant","restore","restriction","result","retain","retire","retirement","return","reveal","revenue","review","revolution","rhythm","rifle","right","river","romantic","rough","roughly","round","route","routine","running","rural","Russian","sacred","safety","salad","salary","sales","sample","sanction","satellite","satisfaction","satisfy","sauce","saving","scale","scandal","scared","scenario","scene","schedule","scheme","scholar","scholarship","school","science","scientific","scientist","scope","score","scream","screen","script","search","season","second","secret","secretary","section","sector","secure","security","segment","seize","select","selection","Senate","senator","senior","sense","sensitive","sentence","separate","sequence","series","serious","seriously","serve","service","session","setting","settle","settlement","seven","several","severe","sexual","shade","shadow","shake","shall","shape","share","sharp","sheet","shelf","shell","shelter","shift","shine","shirt","shock","shoot","shooting","shopping","shore","short","shortly","should","shoulder","shout","shower","shrug","sight","signal","significance","significant","significantly","silence","silent","silver","similar","similarly","simple","simply","since","singer","single","sister","situation","skill","slave","sleep","slice","slide","slight","slightly","slowly","small","smart","smell","smile","smoke","smooth","soccer","social","society","software","solar","soldier","solid","solution","solve","somebody","somehow","someone","something","sometimes","somewhat","somewhere","sophisticated","sorry","sound","source","south","southern","Soviet","space","Spanish","speak","speaker","special","specialist","species","specific","specifically","speech","speed","spend","spending","spirit","spiritual","split","spokesman","sport","spread","spring","square","squeeze","stability","stable","staff","stage","stair","stake","stand","standard","standing","stare","start","state","statement","station","statistics","status","steady","steal","steel","stick","still","stock","stomach","stone","storage","store","storm","story","straight","strange","stranger","strategic","strategy","stream","street","strength","strengthen","stress","stretch","strike","string","strip","stroke","strong","strongly","structure","struggle","student","studio","study","stuff","stupid","style","subject","submit","subsequent","substance","substantial","succeed","success","successful","successfully","sudden","suddenly","suffer","sufficient","sugar","suggest","suggestion","suicide","summer","summit","super","supply","support","supporter","suppose","supposed","Supreme","surely","surface","surgery","surprise","surprised","surprising","surprisingly","surround","survey","survival","survive","survivor","suspect","sustain","swear","sweep","sweet","swing","switch","symbol","symptom","system","table","tablespoon","tactic","talent","target","taste","taxpayer","teach","teacher","teaching","teaspoon","technical","technique","technology","teenager","telephone","telescope","television","temperature","temporary","tendency","tennis","tension","terms","terrible","territory","terror","terrorism","terrorist","testify","testimony","testing","thank","thanks","theater","their","theme","themselves","theory","therapy","there","therefore","these","thick","thing","think","thinking","third","thirty","those","though","thought","thousand","threat","threaten","three","throat","through","throughout","throw","ticket","tight","tired","tissue","title","tobacco","today","together","tomato","tomorrow","tongue","tonight","tooth","topic","total","totally","touch","tough","tourist","tournament","toward","towards","tower","trace","track","trade","tradition","traditional","traffic","tragedy","trail","train","training","transfer","transform","transformation","transition","translate","transportation","travel","treat","treatment","treaty","tremendous","trend","trial","tribe","trick","troop","trouble","truck","truly","trust","truth","tunnel","twelve","twenty","twice","typical","typically","ultimate","ultimately","unable","uncle","under","undergo","understand","understanding","unfortunately","uniform","union","unique","United","universal","universe","university","unknown","unless","unlike","unlikely","until","unusual","upper","urban","useful","usual","usually","utility","vacation","valley","valuable","value","variable","variation","variety","various","vegetable","vehicle","venture","version","versus","vessel","veteran","victim","victory","video","viewer","village","violate","violation","violence","violent","virtually","virtue","virus","visible","vision","visit","visitor","visual","vital","voice","volume","volunteer","voter","vulnerable","wander","warning","waste","watch","water","wealth","wealthy","weapon","weather","wedding","weekend","weekly","weigh","weight","welcome","welfare","western","whatever","wheel","whenever","where","whereas","whether","which","while","whisper","white","whole","whose","widely","widespread","willing","window","winner","winter","wisdom","withdraw","within","without","witness","woman","wonder","wonderful","wooden","worker","working","works","workshop","world","worried","worry","worth","would","wound","write","writer","writing","wrong","yellow","yesterday","yield","young","yours","yourself","youth"]
