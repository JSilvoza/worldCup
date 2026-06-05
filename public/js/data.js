// All seed data embedded as a module — no fetch calls, no build step.
// Matches are computed once at module load using the same algorithm as seed.js.

const _teams = [
  { name:'United States',  code:'USA', iso2:'us',     group_id:'A', flag:'🇺🇸', confederation:'CONCACAF', fifa_rank:11,  is_host:1 },
  { name:'Panama',         code:'PAN', iso2:'pa',     group_id:'A', flag:'🇵🇦', confederation:'CONCACAF', fifa_rank:42,  is_host:0 },
  { name:'Serbia',         code:'SRB', iso2:'rs',     group_id:'A', flag:'🇷🇸', confederation:'UEFA',     fifa_rank:33,  is_host:0 },
  { name:'Algeria',        code:'ALG', iso2:'dz',     group_id:'A', flag:'🇩🇿', confederation:'CAF',      fifa_rank:35,  is_host:0 },
  { name:'Mexico',         code:'MEX', iso2:'mx',     group_id:'B', flag:'🇲🇽', confederation:'CONCACAF', fifa_rank:15,  is_host:1 },
  { name:'Jamaica',        code:'JAM', iso2:'jm',     group_id:'B', flag:'🇯🇲', confederation:'CONCACAF', fifa_rank:55,  is_host:0 },
  { name:'South Korea',    code:'KOR', iso2:'kr',     group_id:'B', flag:'🇰🇷', confederation:'AFC',      fifa_rank:23,  is_host:0 },
  { name:'Austria',        code:'AUT', iso2:'at',     group_id:'B', flag:'🇦🇹', confederation:'UEFA',     fifa_rank:25,  is_host:0 },
  { name:'Canada',         code:'CAN', iso2:'ca',     group_id:'C', flag:'🇨🇦', confederation:'CONCACAF', fifa_rank:39,  is_host:1 },
  { name:'Ukraine',        code:'UKR', iso2:'ua',     group_id:'C', flag:'🇺🇦', confederation:'UEFA',     fifa_rank:22,  is_host:0 },
  { name:'Honduras',       code:'HON', iso2:'hn',     group_id:'C', flag:'🇭🇳', confederation:'CONCACAF', fifa_rank:78,  is_host:0 },
  { name:'Morocco',        code:'MAR', iso2:'ma',     group_id:'C', flag:'🇲🇦', confederation:'CAF',      fifa_rank:14,  is_host:0 },
  { name:'Argentina',      code:'ARG', iso2:'ar',     group_id:'D', flag:'🇦🇷', confederation:'CONMEBOL', fifa_rank:1,   is_host:0 },
  { name:'Chile',          code:'CHI', iso2:'cl',     group_id:'D', flag:'🇨🇱', confederation:'CONMEBOL', fifa_rank:31,  is_host:0 },
  { name:'Peru',           code:'PER', iso2:'pe',     group_id:'D', flag:'🇵🇪', confederation:'CONMEBOL', fifa_rank:58,  is_host:0 },
  { name:'New Zealand',    code:'NZL', iso2:'nz',     group_id:'D', flag:'🇳🇿', confederation:'OFC',      fifa_rank:95,  is_host:0 },
  { name:'Spain',          code:'ESP', iso2:'es',     group_id:'E', flag:'🇪🇸', confederation:'UEFA',     fifa_rank:2,   is_host:0 },
  { name:'Japan',          code:'JPN', iso2:'jp',     group_id:'E', flag:'🇯🇵', confederation:'AFC',      fifa_rank:18,  is_host:0 },
  { name:'Senegal',        code:'SEN', iso2:'sn',     group_id:'E', flag:'🇸🇳', confederation:'CAF',      fifa_rank:20,  is_host:0 },
  { name:'Romania',        code:'ROU', iso2:'ro',     group_id:'E', flag:'🇷🇴', confederation:'UEFA',     fifa_rank:46,  is_host:0 },
  { name:'Brazil',         code:'BRA', iso2:'br',     group_id:'F', flag:'🇧🇷', confederation:'CONMEBOL', fifa_rank:5,   is_host:0 },
  { name:'Colombia',       code:'COL', iso2:'co',     group_id:'F', flag:'🇨🇴', confederation:'CONMEBOL', fifa_rank:9,   is_host:0 },
  { name:'Ivory Coast',    code:'CIV', iso2:'ci',     group_id:'F', flag:'🇨🇮', confederation:'CAF',      fifa_rank:27,  is_host:0 },
  { name:'Paraguay',       code:'PAR', iso2:'py',     group_id:'F', flag:'🇵🇾', confederation:'CONMEBOL', fifa_rank:61,  is_host:0 },
  { name:'France',         code:'FRA', iso2:'fr',     group_id:'G', flag:'🇫🇷', confederation:'UEFA',     fifa_rank:3,   is_host:0 },
  { name:'Ecuador',        code:'ECU', iso2:'ec',     group_id:'G', flag:'🇪🇨', confederation:'CONMEBOL', fifa_rank:47,  is_host:0 },
  { name:'Saudi Arabia',   code:'KSA', iso2:'sa',     group_id:'G', flag:'🇸🇦', confederation:'AFC',      fifa_rank:56,  is_host:0 },
  { name:'Nigeria',        code:'NGA', iso2:'ng',     group_id:'G', flag:'🇳🇬', confederation:'CAF',      fifa_rank:37,  is_host:0 },
  { name:'England',        code:'ENG', iso2:'gb-eng', group_id:'H', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation:'UEFA',     fifa_rank:4,   is_host:0 },
  { name:'Cameroon',       code:'CMR', iso2:'cm',     group_id:'H', flag:'🇨🇲', confederation:'CAF',      fifa_rank:42,  is_host:0 },
  { name:'Bolivia',        code:'BOL', iso2:'bo',     group_id:'H', flag:'🇧🇴', confederation:'CONMEBOL', fifa_rank:83,  is_host:0 },
  { name:'Czech Republic', code:'CZE', iso2:'cz',     group_id:'H', flag:'🇨🇿', confederation:'UEFA',     fifa_rank:40,  is_host:0 },
  { name:'Germany',        code:'GER', iso2:'de',     group_id:'I', flag:'🇩🇪', confederation:'UEFA',     fifa_rank:12,  is_host:0 },
  { name:'Croatia',        code:'CRO', iso2:'hr',     group_id:'I', flag:'🇭🇷', confederation:'UEFA',     fifa_rank:10,  is_host:0 },
  { name:'Egypt',          code:'EGY', iso2:'eg',     group_id:'I', flag:'🇪🇬', confederation:'CAF',      fifa_rank:36,  is_host:0 },
  { name:'Ghana',          code:'GHA', iso2:'gh',     group_id:'I', flag:'🇬🇭', confederation:'CAF',      fifa_rank:59,  is_host:0 },
  { name:'Portugal',       code:'POR', iso2:'pt',     group_id:'J', flag:'🇵🇹', confederation:'UEFA',     fifa_rank:6,   is_host:0 },
  { name:'Uruguay',        code:'URU', iso2:'uy',     group_id:'J', flag:'🇺🇾', confederation:'CONMEBOL', fifa_rank:16,  is_host:0 },
  { name:'Iran',           code:'IRN', iso2:'ir',     group_id:'J', flag:'🇮🇷', confederation:'AFC',      fifa_rank:24,  is_host:0 },
  { name:'Costa Rica',     code:'CRC', iso2:'cr',     group_id:'J', flag:'🇨🇷', confederation:'CONCACAF', fifa_rank:52,  is_host:0 },
  { name:'Netherlands',    code:'NED', iso2:'nl',     group_id:'K', flag:'🇳🇱', confederation:'UEFA',     fifa_rank:7,   is_host:0 },
  { name:'Belgium',        code:'BEL', iso2:'be',     group_id:'K', flag:'🇧🇪', confederation:'UEFA',     fifa_rank:8,   is_host:0 },
  { name:'Venezuela',      code:'VEN', iso2:'ve',     group_id:'K', flag:'🇻🇪', confederation:'CONMEBOL', fifa_rank:67,  is_host:0 },
  { name:'Tunisia',        code:'TUN', iso2:'tn',     group_id:'K', flag:'🇹🇳', confederation:'CAF',      fifa_rank:30,  is_host:0 },
  { name:'Italy',          code:'ITA', iso2:'it',     group_id:'L', flag:'🇮🇹', confederation:'UEFA',     fifa_rank:13,  is_host:0 },
  { name:'Poland',         code:'POL', iso2:'pl',     group_id:'L', flag:'🇵🇱', confederation:'UEFA',     fifa_rank:29,  is_host:0 },
  { name:'Switzerland',    code:'SUI', iso2:'ch',     group_id:'L', flag:'🇨🇭', confederation:'UEFA',     fifa_rank:19,  is_host:0 },
  { name:'Indonesia',      code:'IDN', iso2:'id',     group_id:'L', flag:'🇮🇩', confederation:'AFC',      fifa_rank:130, is_host:0 },
];

const _starPlayers = [
  // ── Group A ────────────────────────────────────────────────────────────────
  { code:'USA', players:[
    {name:'Matt Turner',             pos:'GK',num:1 },{name:'Ethan Horvath',           pos:'GK',num:18},
    {name:'Sergiño Dest',            pos:'DF',num:2 },{name:'Antonee Robinson',         pos:'DF',num:13},
    {name:'Walker Zimmermann',       pos:'DF',num:5 },{name:'Tim Ream',                 pos:'DF',num:3 },
    {name:'Joe Scally',              pos:'DF',num:16},{name:'Tyler Adams',              pos:'MF',num:4 },
    {name:'Weston McKennie',         pos:'MF',num:8 },{name:'Yunus Musah',              pos:'MF',num:6 },
    {name:'Gio Reyna',               pos:'MF',num:7 },{name:'Brenden Aaronson',         pos:'MF',num:11},
    {name:'Christian Pulisic',       pos:'FW',num:10},{name:'Tim Weah',                 pos:'FW',num:14},
    {name:'Josh Sargent',            pos:'FW',num:9 },{name:'Ricardo Pepi',             pos:'FW',num:21},
  ]},
  { code:'PAN', players:[
    {name:'Luis Mejía',              pos:'GK',num:1 },{name:'Harold Cummings',          pos:'DF',num:5 },
    {name:'Fidel Escobar',           pos:'DF',num:3 },{name:'Eric Davis',               pos:'DF',num:6 },
    {name:'Édgar Bárcenas',          pos:'DF',num:2 },{name:'Adalberto Carrasquilla',   pos:'MF',num:10},
    {name:'Aníbal Godoy',            pos:'MF',num:15},{name:'José Fajardo',             pos:'MF',num:8 },
    {name:'Ismael Díaz',             pos:'FW',num:9 },{name:'Rolando Blackburn',        pos:'FW',num:7 },
    {name:'Cecilio Waterman',        pos:'FW',num:11},{name:'Alberto Quintero',         pos:'FW',num:17},
  ]},
  { code:'SRB', players:[
    {name:'Predrag Rajković',        pos:'GK',num:1 },{name:'Đorđe Petrović',           pos:'GK',num:12},
    {name:'Strahinja Pavlović',      pos:'DF',num:5 },{name:'Nikola Milenković',        pos:'DF',num:4 },
    {name:'Uroš Spajić',            pos:'DF',num:6 },{name:'Filip Mladenović',          pos:'DF',num:3 },
    {name:'Sergej Milinković-Savić', pos:'MF',num:8 },{name:'Saša Lukić',              pos:'MF',num:20},
    {name:'Nemanja Gudelj',          pos:'MF',num:14},{name:'Filip Kostić',             pos:'MF',num:11},
    {name:'Dušan Vlahović',          pos:'FW',num:9 },{name:'Aleksandar Mitrović',      pos:'FW',num:7 },
    {name:'Luka Jović',              pos:'FW',num:17},{name:'Dušan Tadić',              pos:'FW',num:10},
  ]},
  { code:'ALG', players:[
    {name:'Rais M\'Bolhi',           pos:'GK',num:1 },{name:'Djamel Benlamri',          pos:'DF',num:4 },
    {name:'Ramy Bensebaini',         pos:'DF',num:3 },{name:'Aissa Mandi',              pos:'DF',num:5 },
    {name:'Youcef Atal',             pos:'DF',num:2 },{name:'Ismail Bennacer',          pos:'MF',num:6 },
    {name:'Hossem Aouar',            pos:'MF',num:8 },{name:'Sofiane Feghouli',         pos:'MF',num:7 },
    {name:'Riyad Mahrez',            pos:'FW',num:26},{name:'Youcef Belaili',           pos:'FW',num:10},
    {name:'Baghdad Bounedjah',       pos:'FW',num:9 },{name:'Islam Slimani',            pos:'FW',num:11},
  ]},
  // ── Group B ────────────────────────────────────────────────────────────────
  { code:'MEX', players:[
    {name:'Guillermo Ochoa',         pos:'GK',num:1 },{name:'Jorge Sánchez',            pos:'DF',num:2 },
    {name:'Néstor Araujo',           pos:'DF',num:3 },{name:'Johan Vásquez',            pos:'DF',num:5 },
    {name:'Jesús Gallardo',          pos:'DF',num:23},{name:'Edson Álvarez',            pos:'MF',num:6 },
    {name:'Orbelín Pineda',          pos:'MF',num:8 },{name:'Alexis Vega',              pos:'MF',num:16},
    {name:'Hirving Lozano',          pos:'FW',num:22},{name:'Santiago Giménez',         pos:'FW',num:9 },
    {name:'Raúl Jiménez',            pos:'FW',num:10},{name:'Roberto Alvarado',         pos:'FW',num:14},
  ]},
  { code:'JAM', players:[
    {name:'Andre Blake',             pos:'GK',num:1 },{name:'Ethan Pinnock',            pos:'DF',num:5 },
    {name:'Damion Lowe',             pos:'DF',num:4 },{name:'Kemar Lawrence',           pos:'DF',num:3 },
    {name:'Oniel Fisher',            pos:'DF',num:2 },{name:'Bobby Reid',               pos:'MF',num:10},
    {name:'Kasey Palmer',            pos:'MF',num:8 },{name:'Ravel Morrison',           pos:'MF',num:14},
    {name:'Leon Bailey',             pos:'FW',num:7 },{name:'Demarai Gray',             pos:'FW',num:11},
    {name:'Michail Antonio',         pos:'FW',num:9 },{name:'Shamar Nicholson',         pos:'FW',num:21},
  ]},
  { code:'KOR', players:[
    {name:'Kim Seung-gyu',           pos:'GK',num:1 },{name:'Kim Min-jae',              pos:'DF',num:3 },
    {name:'Kim Young-gwon',          pos:'DF',num:4 },{name:'Kim Jin-su',               pos:'DF',num:23},
    {name:'Lee Ki-je',               pos:'DF',num:15},{name:'Jung Woo-young',           pos:'MF',num:5 },
    {name:'Hwang In-beom',           pos:'MF',num:16},{name:'Lee Jae-sung',             pos:'MF',num:14},
    {name:'Son Heung-min',           pos:'FW',num:7 },{name:'Hwang Hee-chan',           pos:'FW',num:11},
    {name:'Cho Gue-sung',            pos:'FW',num:9 },{name:'Oh Se-hun',                pos:'FW',num:20},
  ]},
  { code:'AUT', players:[
    {name:'Patrick Pentz',           pos:'GK',num:1 },{name:'Stefan Posch',             pos:'DF',num:5 },
    {name:'Kevin Danso',             pos:'DF',num:4 },{name:'Philipp Lienhart',         pos:'DF',num:6 },
    {name:'Phillipp Mwene',          pos:'DF',num:15},{name:'Konrad Laimer',            pos:'MF',num:8 },
    {name:'Nicolas Seiwald',         pos:'MF',num:17},{name:'Marcel Sabitzer',          pos:'MF',num:10},
    {name:'Christoph Baumgartner',   pos:'MF',num:14},{name:'Florian Grillitsch',       pos:'MF',num:7 },
    {name:'Marko Arnautovic',        pos:'FW',num:9 },{name:'Michael Gregoritsch',      pos:'FW',num:11},
  ]},
  // ── Group C ────────────────────────────────────────────────────────────────
  { code:'CAN', players:[
    {name:'Milan Borjan',            pos:'GK',num:18},{name:'Alistair Johnston',        pos:'DF',num:2 },
    {name:'Kamal Miller',            pos:'DF',num:3 },{name:'Scott Kennedy',            pos:'DF',num:5 },
    {name:'Richie Laryea',           pos:'DF',num:4 },{name:'Alphonso Davies',          pos:'DF',num:19},
    {name:'Stephen Eustáquio',       pos:'MF',num:7 },{name:'Tajon Buchanan',           pos:'MF',num:11},
    {name:'Ismaël Koné',             pos:'MF',num:8 },{name:'Jonathan David',           pos:'FW',num:9 },
    {name:'Cyle Larin',              pos:'FW',num:17},{name:'Liam Millar',              pos:'FW',num:14},
  ]},
  { code:'UKR', players:[
    {name:'Anatoliy Trubin',         pos:'GK',num:1 },{name:'Oleksandr Zinchenko',      pos:'DF',num:35},
    {name:'Ilya Zabarnyi',           pos:'DF',num:5 },{name:'Mykola Matviyenko',        pos:'DF',num:6 },
    {name:'Yukhym Konoplia',         pos:'DF',num:17},{name:'Taras Stepanenko',         pos:'MF',num:4 },
    {name:'Georgiy Sudakov',         pos:'MF',num:8 },{name:'Viktor Tsygankov',         pos:'MF',num:14},
    {name:'Mykhailo Mudryk',         pos:'FW',num:15},{name:'Artem Dovbyk',             pos:'FW',num:9 },
    {name:'Roman Yaremchuk',         pos:'FW',num:19},{name:'Oleksandr Zinchenko',      pos:'DF',num:35},
  ]},
  { code:'HON', players:[
    {name:'Luis López',              pos:'GK',num:1 },{name:'Marcelo Santos',           pos:'DF',num:2 },
    {name:'Denil Maldonado',         pos:'DF',num:5 },{name:'José Mario Pinto',         pos:'DF',num:3 },
    {name:'Bryan Acosta',            pos:'MF',num:6 },{name:'Kervin Arriaga',           pos:'MF',num:8 },
    {name:'Luis Palma',              pos:'FW',num:10},{name:'Alberth Elis',             pos:'FW',num:7 },
    {name:'Romell Quioto',           pos:'FW',num:11},{name:'Antony Lozano',            pos:'FW',num:9 },
    {name:'Rubilio Castillo',        pos:'FW',num:17},{name:'Jorge Benguché',           pos:'FW',num:19},
  ]},
  { code:'MAR', players:[
    {name:'Yassine Bounou',          pos:'GK',num:1 },{name:'Achraf Hakimi',            pos:'DF',num:2 },
    {name:'Nayef Aguerd',            pos:'DF',num:5 },{name:'Romain Saïss',             pos:'DF',num:6 },
    {name:'Noussair Mazraoui',       pos:'DF',num:3 },{name:'Sofyan Amrabat',           pos:'MF',num:4 },
    {name:'Azzedine Ounahi',         pos:'MF',num:8 },{name:'Hakim Ziyech',             pos:'MF',num:7 },
    {name:'Ilias Chair',             pos:'MF',num:14},{name:'Youssef En-Nesyri',        pos:'FW',num:19},
    {name:'Soufiane Rahimi',         pos:'FW',num:11},{name:'Abde Ezzalzouli',          pos:'FW',num:16},
  ]},
  // ── Group D ────────────────────────────────────────────────────────────────
  { code:'ARG', players:[
    {name:'Emiliano Martínez',       pos:'GK',num:23},{name:'Cristian Romero',          pos:'DF',num:13},
    {name:'Nicolás Otamendi',        pos:'DF',num:19},{name:'Lisandro Martínez',        pos:'DF',num:25},
    {name:'Nahuel Molina',           pos:'DF',num:26},{name:'Rodrigo De Paul',          pos:'MF',num:7 },
    {name:'Enzo Fernández',          pos:'MF',num:24},{name:'Alexis Mac Allister',      pos:'MF',num:20},
    {name:'Lionel Messi',            pos:'FW',num:10},{name:'Julián Álvarez',           pos:'FW',num:9 },
    {name:'Lautaro Martínez',        pos:'FW',num:22},{name:'Ángel Di María',           pos:'FW',num:11},
    {name:'Paulo Dybala',            pos:'FW',num:21},
  ]},
  { code:'CHI', players:[
    {name:'Claudio Bravo',           pos:'GK',num:1 },{name:'Guillermo Maripán',        pos:'DF',num:3 },
    {name:'Paulo Díaz',              pos:'DF',num:6 },{name:'Mauricio Isla',            pos:'DF',num:4 },
    {name:'Gabriel Suazo',           pos:'DF',num:12},{name:'Charles Aránguiz',         pos:'MF',num:8 },
    {name:'Erick Pulgar',            pos:'MF',num:10},{name:'Arturo Vidal',             pos:'MF',num:23},
    {name:'Alexis Sánchez',          pos:'FW',num:7 },{name:'Eduardo Vargas',           pos:'FW',num:11},
    {name:'Ben Brereton Díaz',       pos:'FW',num:9 },{name:'Damián Pizarro',           pos:'FW',num:19},
  ]},
  { code:'PER', players:[
    {name:'Pedro Gallese',           pos:'GK',num:1 },{name:'Luis Advíncula',           pos:'DF',num:17},
    {name:'Alexander Callens',       pos:'DF',num:2 },{name:'Carlos Zambrano',          pos:'DF',num:5 },
    {name:'Miguel Trauco',           pos:'DF',num:3 },{name:'Renato Tapia',             pos:'MF',num:8 },
    {name:'Yoshimar Yotún',          pos:'MF',num:7 },{name:'Edison Flores',            pos:'MF',num:10},
    {name:'André Carrillo',          pos:'FW',num:18},{name:'Gianluca Lapadula',        pos:'FW',num:9 },
    {name:'Bryan Reyna',             pos:'FW',num:20},{name:'Christian Cueva',          pos:'MF',num:11},
  ]},
  { code:'NZL', players:[
    {name:'Joe Leckie',              pos:'GK',num:1 },{name:'Michael Boxall',           pos:'DF',num:5 },
    {name:'Liberato Cacace',         pos:'DF',num:2 },{name:'Dane Ingham',              pos:'DF',num:4 },
    {name:'Noah Billingsley',        pos:'DF',num:15},{name:'Ryan Thomas',              pos:'MF',num:8 },
    {name:'Marko Štemić',           pos:'MF',num:14},{name:'Clayton Lewis',            pos:'MF',num:10},
    {name:'Chris Wood',              pos:'FW',num:9 },{name:'Caleb Watts',              pos:'FW',num:11},
    {name:'Myer Bevan',              pos:'FW',num:21},{name:'Matthew Garbett',          pos:'MF',num:17},
  ]},
  // ── Group E ────────────────────────────────────────────────────────────────
  { code:'ESP', players:[
    {name:'David Raya',              pos:'GK',num:1 },{name:'Dani Carvajal',            pos:'DF',num:2 },
    {name:'Robin Le Normand',        pos:'DF',num:24},{name:'Aymeric Laporte',          pos:'DF',num:14},
    {name:'Alejandro Grimaldo',      pos:'DF',num:3 },{name:'Rodri',                   pos:'MF',num:16},
    {name:'Pedri',                   pos:'MF',num:8 },{name:'Fabián Ruiz',             pos:'MF',num:11},
    {name:'Dani Olmo',               pos:'MF',num:10},{name:'Lamine Yamal',            pos:'FW',num:19},
    {name:'Nico Williams',           pos:'FW',num:17},{name:'Álvaro Morata',           pos:'FW',num:7 },
    {name:'Ferran Torres',           pos:'FW',num:20},{name:'Mikel Merino',            pos:'MF',num:22},
  ]},
  { code:'JPN', players:[
    {name:'Shuichi Gonda',           pos:'GK',num:1 },{name:'Ko Itakura',              pos:'DF',num:4 },
    {name:'Takehiro Tomiyasu',       pos:'DF',num:5 },{name:'Maya Yoshida',            pos:'DF',num:22},
    {name:'Yuto Nagatomo',           pos:'DF',num:5 },{name:'Wataru Endo',             pos:'MF',num:3 },
    {name:'Hidemasa Morita',         pos:'MF',num:6 },{name:'Daichi Kamada',           pos:'MF',num:14},
    {name:'Takefusa Kubo',           pos:'FW',num:11},{name:'Kaoru Mitoma',            pos:'FW',num:9 },
    {name:'Takumi Minamino',         pos:'FW',num:10},{name:'Ayase Ueda',              pos:'FW',num:15},
    {name:'Junya Ito',               pos:'FW',num:17},
  ]},
  { code:'SEN', players:[
    {name:'Édouard Mendy',           pos:'GK',num:16},{name:'Kalidou Koulibaly',        pos:'DF',num:3 },
    {name:'Abdou Diallo',            pos:'DF',num:5 },{name:'Formose Mendy',           pos:'DF',num:2 },
    {name:'Ismail Jakobs',           pos:'DF',num:12},{name:'Idrissa Gueye',           pos:'MF',num:13},
    {name:'Pape Matar Sarr',         pos:'MF',num:8 },{name:'Nampalys Mendy',          pos:'MF',num:4 },
    {name:'Sadio Mané',              pos:'FW',num:10},{name:'Ismaila Sarr',            pos:'FW',num:23},
    {name:'Boulaye Dia',             pos:'FW',num:14},{name:'Habib Diallo',            pos:'FW',num:9 },
  ]},
  { code:'ROU', players:[
    {name:'Florin Niță',             pos:'GK',num:12},{name:'Andrei Rațiu',            pos:'DF',num:2 },
    {name:'Radu Drăgușin',          pos:'DF',num:14},{name:'Andrei Burcă',            pos:'DF',num:15},
    {name:'Nicușor Bancu',           pos:'DF',num:3 },{name:'Răzvan Marin',            pos:'MF',num:18},
    {name:'Ianis Hagi',              pos:'MF',num:10},{name:'Florinel Coman',          pos:'MF',num:11},
    {name:'Valentin Mihăilă',        pos:'FW',num:19},{name:'Denis Man',               pos:'FW',num:7 },
    {name:'Denis Drăguș',           pos:'FW',num:9 },{name:'George Pușcaș',           pos:'FW',num:17},
  ]},
  // ── Group F ────────────────────────────────────────────────────────────────
  { code:'BRA', players:[
    {name:'Alisson Becker',          pos:'GK',num:1 },{name:'Danilo',                  pos:'DF',num:2 },
    {name:'Marquinhos',              pos:'DF',num:4 },{name:'Gabriel Magalhães',        pos:'DF',num:24},
    {name:'Renan Lodi',              pos:'DF',num:6 },{name:'Casemiro',                pos:'MF',num:5 },
    {name:'Bruno Guimarães',         pos:'MF',num:18},{name:'Lucas Paquetá',           pos:'MF',num:10},
    {name:'Vinicius Jr.',            pos:'FW',num:7 },{name:'Rodrygo',                 pos:'FW',num:11},
    {name:'Raphinha',                pos:'FW',num:19},{name:'Richarlison',              pos:'FW',num:9 },
    {name:'Endrick',                 pos:'FW',num:25},
  ]},
  { code:'COL', players:[
    {name:'Camilo Vargas',           pos:'GK',num:22},{name:'Daniel Muñoz',             pos:'DF',num:2 },
    {name:'Davinson Sánchez',        pos:'DF',num:13},{name:'Jhon Lucumí',              pos:'DF',num:3 },
    {name:'Johan Mojica',            pos:'DF',num:6 },{name:'Wilmar Barrios',           pos:'MF',num:5 },
    {name:'Mateus Uribe',            pos:'MF',num:8 },{name:'James Rodríguez',          pos:'MF',num:10},
    {name:'Luis Díaz',               pos:'FW',num:7 },{name:'Jhon Córdoba',             pos:'FW',num:9 },
    {name:'Cucho Hernández',         pos:'FW',num:11},{name:'Rafael Santos Borré',      pos:'FW',num:19},
  ]},
  { code:'CIV', players:[
    {name:'Yahia Fofana',            pos:'GK',num:1 },{name:'Serge Aurier',             pos:'DF',num:24},
    {name:'Simon Deli',              pos:'DF',num:5 },{name:'Eric Bailly',              pos:'DF',num:3 },
    {name:'Wilfried Singo',          pos:'DF',num:2 },{name:'Ibrahim Sangaré',          pos:'MF',num:16},
    {name:'Franck Kessié',           pos:'MF',num:19},{name:'Seko Fofana',              pos:'MF',num:8 },
    {name:'Nicolas Pépé',            pos:'FW',num:7 },{name:'Sébastien Haller',         pos:'FW',num:9 },
    {name:'Wilfried Zaha',           pos:'FW',num:11},{name:'Simon Adingra',            pos:'FW',num:14},
  ]},
  { code:'PAR', players:[
    {name:'Anthony Silva',           pos:'GK',num:12},{name:'Gustavo Gómez',            pos:'DF',num:5 },
    {name:'Fabián Balbuena',         pos:'DF',num:3 },{name:'Omar Alderete',            pos:'DF',num:2 },
    {name:'Santiago Cáceres',        pos:'DF',num:4 },{name:'Mathías Villasanti',       pos:'MF',num:7 },
    {name:'Miguel Almirón',          pos:'MF',num:10},{name:'Richard Sánchez',          pos:'MF',num:8 },
    {name:'Julio Enciso',            pos:'FW',num:11},{name:'Antonio Sanabria',         pos:'FW',num:9 },
    {name:'Braian Samudio',          pos:'FW',num:14},{name:'Carlos González',          pos:'DF',num:6 },
  ]},
  // ── Group G ────────────────────────────────────────────────────────────────
  { code:'FRA', players:[
    {name:'Mike Maignan',            pos:'GK',num:16},{name:'Jules Koundé',             pos:'DF',num:5 },
    {name:'William Saliba',          pos:'DF',num:17},{name:'Dayot Upamecano',          pos:'DF',num:4 },
    {name:'Théo Hernández',          pos:'DF',num:22},{name:'N\'Golo Kanté',            pos:'MF',num:13},
    {name:'Aurélien Tchouaméni',     pos:'MF',num:8 },{name:'Antoine Griezmann',        pos:'MF',num:7 },
    {name:'Ousmane Dembélé',         pos:'FW',num:11},{name:'Kylian Mbappé',            pos:'FW',num:10},
    {name:'Marcus Thuram',           pos:'FW',num:9 },{name:'Randal Kolo Muani',        pos:'FW',num:21},
    {name:'Bradley Barcola',         pos:'FW',num:20},
  ]},
  { code:'ECU', players:[
    {name:'Hernán Galíndez',         pos:'GK',num:1 },{name:'Piero Hincapié',           pos:'DF',num:3 },
    {name:'Félix Torres',            pos:'DF',num:5 },{name:'William Pacho',            pos:'DF',num:4 },
    {name:'Ángelo Preciado',         pos:'DF',num:2 },{name:'Moisés Caicedo',           pos:'MF',num:10},
    {name:'Carlos Gruezo',           pos:'MF',num:8 },{name:'Jeremy Sarmiento',         pos:'MF',num:14},
    {name:'Enner Valencia',          pos:'FW',num:13},{name:'Gonzalo Plata',            pos:'FW',num:7 },
    {name:'Michael Estrada',         pos:'FW',num:9 },{name:'Djorkaeff Reasco',         pos:'FW',num:11},
  ]},
  { code:'KSA', players:[
    {name:'Mohammed Al-Owais',       pos:'GK',num:21},{name:'Ali Al-Bulayhi',           pos:'DF',num:13},
    {name:'Sultan Al-Ghannam',       pos:'DF',num:5 },{name:'Hassan Tambakti',          pos:'DF',num:6 },
    {name:'Yasser Al-Shahrani',      pos:'DF',num:16},{name:'Salman Al-Faraj',          pos:'MF',num:7 },
    {name:'Mohamed Kanno',           pos:'MF',num:8 },{name:'Ali Al-Hassan',            pos:'MF',num:10},
    {name:'Salem Al-Dawsari',        pos:'FW',num:11},{name:'Firas Al-Buraikan',        pos:'FW',num:9 },
    {name:'Abdullah Al-Hamdan',      pos:'FW',num:17},{name:'Hattan Bahebri',           pos:'FW',num:15},
  ]},
  { code:'NGA', players:[
    {name:'Stanley Nwabali',         pos:'GK',num:22},{name:'William Troost-Ekong',     pos:'DF',num:5 },
    {name:'Semi Ajayi',              pos:'DF',num:16},{name:'Zaidu Sanusi',             pos:'DF',num:3 },
    {name:'Calvin Bassey',           pos:'DF',num:6 },{name:'Wilfred Ndidi',            pos:'MF',num:4 },
    {name:'Alex Iwobi',              pos:'MF',num:10},{name:'Frank Onyeka',             pos:'MF',num:8 },
    {name:'Victor Osimhen',          pos:'FW',num:9 },{name:'Samuel Chukwueze',         pos:'FW',num:7 },
    {name:'Moses Simon',             pos:'FW',num:11},{name:'Kelechi Iheanacho',        pos:'FW',num:19},
  ]},
  // ── Group H ────────────────────────────────────────────────────────────────
  { code:'ENG', players:[
    {name:'Jordan Pickford',         pos:'GK',num:1 },{name:'Kyle Walker',              pos:'DF',num:2 },
    {name:'John Stones',             pos:'DF',num:5 },{name:'Harry Maguire',            pos:'DF',num:6 },
    {name:'Luke Shaw',               pos:'DF',num:3 },{name:'Trent Alexander-Arnold',   pos:'MF',num:66},
    {name:'Declan Rice',             pos:'MF',num:4 },{name:'Jude Bellingham',          pos:'MF',num:10},
    {name:'Phil Foden',              pos:'MF',num:47},{name:'Bukayo Saka',              pos:'FW',num:7 },
    {name:'Harry Kane',              pos:'FW',num:9 },{name:'Cole Palmer',              pos:'MF',num:20},
    {name:'Ollie Watkins',           pos:'FW',num:19},{name:'Marcus Rashford',          pos:'FW',num:11},
  ]},
  { code:'CMR', players:[
    {name:'André Onana',             pos:'GK',num:1 },{name:'Jean-Charles Castelletto', pos:'DF',num:6 },
    {name:'Collins Fai',             pos:'DF',num:17},{name:'Olivier Mbaizo',           pos:'DF',num:2 },
    {name:'Nouhou Tolo',             pos:'DF',num:3 },{name:'André Zambo Anguissa',     pos:'MF',num:24},
    {name:'Samuel Oum Gouet',        pos:'MF',num:8 },{name:'Martin Hongla',            pos:'MF',num:14},
    {name:'Bryan Mbeumo',            pos:'FW',num:7 },{name:'Karl Toko Ekambi',         pos:'FW',num:9 },
    {name:'Vincent Aboubakar',       pos:'FW',num:10},{name:'Jean-Pierre Nsame',        pos:'FW',num:17},
  ]},
  { code:'BOL', players:[
    {name:'Carlos Lampe',            pos:'GK',num:12},{name:'Luis Haquín',              pos:'DF',num:5 },
    {name:'José Sagredo',            pos:'DF',num:3 },{name:'Diego Bejarano',           pos:'DF',num:4 },
    {name:'Jairo Quinteros',         pos:'DF',num:15},{name:'Ramiro Vaca',              pos:'MF',num:10},
    {name:'Erwin Saavedra',          pos:'MF',num:14},{name:'Leonel Justiniano',        pos:'MF',num:8 },
    {name:'Marcelo Martins',         pos:'FW',num:9 },{name:'Bruno Miranda',            pos:'FW',num:7 },
    {name:'Jeyson Chura',            pos:'FW',num:11},{name:'Víctor Ábrego',            pos:'MF',num:6 },
  ]},
  { code:'CZE', players:[
    {name:'Jiří Pavlenka',           pos:'GK',num:1 },{name:'Vladimír Coufal',          pos:'DF',num:5 },
    {name:'Ladislav Krejčí',         pos:'DF',num:3 },{name:'Tomáš Holes',             pos:'DF',num:21},
    {name:'Jan Bořil',               pos:'DF',num:15},{name:'Tomáš Souček',            pos:'MF',num:6 },
    {name:'Alex Král',               pos:'MF',num:8 },{name:'Lukáš Masopust',          pos:'MF',num:17},
    {name:'Patrik Schick',           pos:'FW',num:10},{name:'Adam Hložek',             pos:'FW',num:11},
    {name:'Jan Kuchta',              pos:'FW',num:9 },{name:'Ondřej Lingr',            pos:'MF',num:20},
  ]},
  // ── Group I ────────────────────────────────────────────────────────────────
  { code:'GER', players:[
    {name:'Manuel Neuer',            pos:'GK',num:1 },{name:'Antonio Rüdiger',          pos:'DF',num:2 },
    {name:'Jonathan Tah',            pos:'DF',num:4 },{name:'Nico Schlotterbeck',       pos:'DF',num:16},
    {name:'David Raum',              pos:'DF',num:19},{name:'Joshua Kimmich',           pos:'MF',num:6 },
    {name:'İlkay Gündoğan',          pos:'MF',num:21},{name:'Florian Wirtz',            pos:'MF',num:10},
    {name:'Jamal Musiala',           pos:'MF',num:14},{name:'Kai Havertz',              pos:'FW',num:7 },
    {name:'Leroy Sané',              pos:'FW',num:19},{name:'Niclas Füllkrug',          pos:'FW',num:9 },
    {name:'Serge Gnabry',            pos:'FW',num:10},{name:'Thomas Müller',            pos:'FW',num:25},
  ]},
  { code:'CRO', players:[
    {name:'Dominik Livaković',       pos:'GK',num:1 },{name:'Joško Gvardiol',           pos:'DF',num:4 },
    {name:'Josip Šutalo',            pos:'DF',num:3 },{name:'Josip Juranović',          pos:'DF',num:2 },
    {name:'Borna Sosa',              pos:'DF',num:16},{name:'Luka Modrić',              pos:'MF',num:10},
    {name:'Mateo Kovačić',           pos:'MF',num:8 },{name:'Marcelo Brozović',         pos:'MF',num:11},
    {name:'Andrej Kramarić',         pos:'FW',num:9 },{name:'Nikola Vlašić',            pos:'FW',num:7 },
    {name:'Ivan Perišić',            pos:'FW',num:14},{name:'Bruno Petković',           pos:'FW',num:17},
  ]},
  { code:'EGY', players:[
    {name:'Mohamed El-Shenawy',      pos:'GK',num:1 },{name:'Ahmed Hegazi',             pos:'DF',num:5 },
    {name:'Omar Kamal',              pos:'DF',num:22},{name:'Akram Tawfik',             pos:'DF',num:2 },
    {name:'Mohamed Hany',            pos:'DF',num:3 },{name:'Tarek Hamed',              pos:'MF',num:6 },
    {name:'Amr Warda',               pos:'MF',num:10},{name:'Mostafa Mohamed',          pos:'FW',num:17},
    {name:'Mohamed Salah',           pos:'FW',num:11},{name:'Omar Marmoush',            pos:'FW',num:9 },
    {name:'Marwan Hamdi',            pos:'FW',num:15},{name:'Mahmoud Trezeguet',        pos:'FW',num:7 },
  ]},
  { code:'GHA', players:[
    {name:'Lawrence Ati-Zigi',       pos:'GK',num:23},{name:'Daniel Amartey',           pos:'DF',num:15},
    {name:'Jonathan Mensah',         pos:'DF',num:3 },{name:'Andy Yiadom',              pos:'DF',num:2 },
    {name:'Baba Rahman',             pos:'DF',num:12},{name:'Thomas Partey',            pos:'MF',num:5 },
    {name:'Mohammed Kudus',          pos:'MF',num:10},{name:'Salis Abdul Samed',        pos:'MF',num:14},
    {name:'Inaki Williams',          pos:'FW',num:19},{name:'Jordan Ayew',              pos:'FW',num:7 },
    {name:'Osman Bukari',            pos:'FW',num:17},{name:'Antoine Semenyo',          pos:'FW',num:11},
  ]},
  // ── Group J ────────────────────────────────────────────────────────────────
  { code:'POR', players:[
    {name:'Diogo Costa',             pos:'GK',num:1 },{name:'João Cancelo',             pos:'DF',num:20},
    {name:'Rúben Dias',              pos:'DF',num:3 },{name:'António Silva',            pos:'DF',num:26},
    {name:'Nuno Mendes',             pos:'DF',num:22},{name:'João Palhinha',            pos:'MF',num:16},
    {name:'Vitinha',                 pos:'MF',num:18},{name:'Bruno Fernandes',          pos:'MF',num:8 },
    {name:'Bernardo Silva',          pos:'MF',num:10},{name:'Rafael Leão',              pos:'FW',num:17},
    {name:'Cristiano Ronaldo',       pos:'FW',num:7 },{name:'Gonçalo Ramos',            pos:'FW',num:9 },
    {name:'Diogo Jota',              pos:'FW',num:11},
  ]},
  { code:'URU', players:[
    {name:'Sergio Rochet',           pos:'GK',num:1 },{name:'Ronald Araújo',            pos:'DF',num:2 },
    {name:'Sebastián Coates',        pos:'DF',num:3 },{name:'José María Giménez',       pos:'DF',num:6 },
    {name:'Mathías Olivera',         pos:'DF',num:12},{name:'Rodrigo Bentancur',        pos:'MF',num:25},
    {name:'Lucas Torreira',          pos:'MF',num:14},{name:'Federico Valverde',        pos:'MF',num:8 },
    {name:'Giorgian de Arrascaeta',  pos:'MF',num:10},{name:'Darwin Núñez',            pos:'FW',num:11},
    {name:'Facundo Torres',          pos:'FW',num:18},{name:'Agustín Canobbio',         pos:'FW',num:17},
  ]},
  { code:'IRN', players:[
    {name:'Alireza Beiranvand',      pos:'GK',num:1 },{name:'Shoja Khalilzadeh',        pos:'DF',num:4 },
    {name:'Milad Mohammadi',         pos:'DF',num:3 },{name:'Ramin Rezaeian',           pos:'DF',num:2 },
    {name:'Majid Hosseini',          pos:'DF',num:5 },{name:'Saeid Ezatolahi',          pos:'MF',num:8 },
    {name:'Alireza Jahanbakhsh',     pos:'MF',num:10},{name:'Saman Ghoddos',            pos:'MF',num:14},
    {name:'Mehdi Taremi',            pos:'FW',num:9 },{name:'Sardar Azmoun',            pos:'FW',num:21},
    {name:'Karim Ansarifard',        pos:'FW',num:11},{name:'Ali Gholizadeh',           pos:'FW',num:7 },
  ]},
  { code:'CRC', players:[
    {name:'Keylor Navas',            pos:'GK',num:1 },{name:'Keysher Fuller',           pos:'DF',num:17},
    {name:'Francisco Calvo',         pos:'DF',num:3 },{name:'Juan Pablo Vargas',        pos:'DF',num:23},
    {name:'Bryan Oviedo',            pos:'DF',num:4 },{name:'Celso Borges',             pos:'MF',num:5 },
    {name:'Yeltsin Tejeda',          pos:'MF',num:11},{name:'Óscar Duarte',             pos:'DF',num:6 },
    {name:'Joel Campbell',           pos:'FW',num:12},{name:'Alonso Martínez',          pos:'FW',num:10},
    {name:'Anthony Contreras',       pos:'FW',num:9 },{name:'Johan Venegas',            pos:'FW',num:7 },
  ]},
  // ── Group K ────────────────────────────────────────────────────────────────
  { code:'NED', players:[
    {name:'Bart Verbruggen',         pos:'GK',num:1 },{name:'Denzel Dumfries',          pos:'DF',num:22},
    {name:'Virgil van Dijk',         pos:'DF',num:4 },{name:'Nathan Aké',               pos:'DF',num:5 },
    {name:'Stefan de Vrij',          pos:'DF',num:3 },{name:'Frenkie de Jong',          pos:'MF',num:21},
    {name:'Tijjani Reijnders',       pos:'MF',num:6 },{name:'Xavi Simons',              pos:'MF',num:7 },
    {name:'Cody Gakpo',              pos:'FW',num:11},{name:'Memphis Depay',            pos:'FW',num:10},
    {name:'Wout Weghorst',           pos:'FW',num:9 },{name:'Donyell Malen',            pos:'FW',num:18},
  ]},
  { code:'BEL', players:[
    {name:'Koen Casteels',           pos:'GK',num:1 },{name:'Timothy Castagne',         pos:'DF',num:2 },
    {name:'Wout Faes',               pos:'DF',num:15},{name:'Arthur Theate',            pos:'DF',num:5 },
    {name:'Jan Vertonghen',          pos:'DF',num:4 },{name:'Kevin De Bruyne',          pos:'MF',num:7 },
    {name:'Youri Tielemans',         pos:'MF',num:8 },{name:'Axel Witsel',              pos:'MF',num:6 },
    {name:'Leandro Trossard',        pos:'FW',num:11},{name:'Romelu Lukaku',            pos:'FW',num:9 },
    {name:'Lois Openda',             pos:'FW',num:15},{name:'Johan Bakayoko',           pos:'FW',num:22},
    {name:'Dodi Lukebakio',          pos:'FW',num:20},
  ]},
  { code:'VEN', players:[
    {name:'Wuilker Faríñez',         pos:'GK',num:1 },{name:'Jhon Murillo',             pos:'DF',num:2 },
    {name:'Óscar Murillo',           pos:'DF',num:5 },{name:'Jhon Chancellor',          pos:'DF',num:4 },
    {name:'Mikel Villanueva',        pos:'DF',num:3 },{name:'Yangel Herrera',           pos:'MF',num:8 },
    {name:'Tomás Rincón',            pos:'MF',num:17},{name:'Jefferson Savarino',       pos:'MF',num:7 },
    {name:'Yeferson Soteldo',        pos:'FW',num:11},{name:'Salomón Rondón',           pos:'FW',num:9 },
    {name:'Josef Martínez',          pos:'FW',num:19},{name:'Darwin Machis',            pos:'FW',num:15},
  ]},
  { code:'TUN', players:[
    {name:'Aymen Dahmen',            pos:'GK',num:1 },{name:'Ali Maaloul',              pos:'DF',num:12},
    {name:'Montassar Talbi',         pos:'DF',num:3 },{name:'Yassine Mériah',           pos:'DF',num:5 },
    {name:'Dylan Bronn',             pos:'DF',num:4 },{name:'Ellyes Skhiri',            pos:'MF',num:6 },
    {name:'Hannibal Mejbri',         pos:'MF',num:14},{name:'Anis Slimane',             pos:'MF',num:15},
    {name:'Wahbi Khazri',            pos:'FW',num:10},{name:'Seifeddine Jaziri',        pos:'FW',num:9 },
    {name:'Taha Yassine Khenissi',   pos:'FW',num:17},{name:'Naïm Sliti',              pos:'FW',num:7 },
  ]},
  // ── Group L ────────────────────────────────────────────────────────────────
  { code:'ITA', players:[
    {name:'Gianluigi Donnarumma',    pos:'GK',num:1 },{name:'Giovanni Di Lorenzo',      pos:'DF',num:2 },
    {name:'Alessandro Bastoni',      pos:'DF',num:23},{name:'Giorgio Scalvini',         pos:'DF',num:3 },
    {name:'Federico Dimarco',        pos:'DF',num:6 },{name:'Nicolò Barella',           pos:'MF',num:18},
    {name:'Sandro Tonali',           pos:'MF',num:4 },{name:'Davide Frattesi',          pos:'MF',num:11},
    {name:'Federico Chiesa',         pos:'FW',num:14},{name:'Giacomo Raspadori',        pos:'FW',num:10},
    {name:'Mateo Retegui',           pos:'FW',num:9 },{name:'Gianluca Scamacca',        pos:'FW',num:19},
    {name:'Lorenzo Pellegrini',      pos:'MF',num:8 },
  ]},
  { code:'POL', players:[
    {name:'Wojciech Szczęsny',       pos:'GK',num:1 },{name:'Jan Bednarek',             pos:'DF',num:5 },
    {name:'Paweł Dawidowicz',        pos:'DF',num:15},{name:'Bartosz Bereszyński',      pos:'DF',num:2 },
    {name:'Nicola Zalewski',         pos:'DF',num:18},{name:'Piotr Zieliński',          pos:'MF',num:10},
    {name:'Grzegorz Krychowiak',     pos:'MF',num:16},{name:'Jakub Moder',              pos:'MF',num:8 },
    {name:'Przemysław Frankowski',   pos:'FW',num:11},{name:'Robert Lewandowski',       pos:'FW',num:9 },
    {name:'Arkadiusz Milik',         pos:'FW',num:16},{name:'Karol Świderski',          pos:'FW',num:7 },
    {name:'Sebastian Szymański',     pos:'MF',num:14},
  ]},
  { code:'SUI', players:[
    {name:'Yann Sommer',             pos:'GK',num:1 },{name:'Manuel Akanji',            pos:'DF',num:5 },
    {name:'Nico Elvedi',             pos:'DF',num:22},{name:'Fabian Schär',             pos:'DF',num:4 },
    {name:'Ricardo Rodríguez',       pos:'DF',num:13},{name:'Granit Xhaka',             pos:'MF',num:10},
    {name:'Remo Freuler',            pos:'MF',num:8 },{name:'Denis Zakaria',            pos:'MF',num:29},
    {name:'Breel Embolo',            pos:'FW',num:7 },{name:'Noah Okafor',              pos:'FW',num:11},
    {name:'Dan Ndoye',               pos:'FW',num:18},{name:'Xherdan Shaqiri',          pos:'FW',num:23},
  ]},
  { code:'IDN', players:[
    {name:'Ernando Ari',             pos:'GK',num:1 },{name:'Elkan Baggott',            pos:'DF',num:5 },
    {name:'Jay Idzes',               pos:'DF',num:2 },{name:'Jordi Amat',               pos:'DF',num:6 },
    {name:'Justin Hubner',           pos:'DF',num:3 },{name:'Marc Klok',                pos:'MF',num:8 },
    {name:'Ivar Jenner',             pos:'MF',num:14},{name:'Nathan Tjoe-A-On',         pos:'MF',num:17},
    {name:'Marselino Ferdinan',      pos:'MF',num:11},{name:'Rafael Struick',           pos:'FW',num:9 },
    {name:'Egy Maulana Vikri',       pos:'FW',num:7 },{name:'Witan Sulaeman',           pos:'FW',num:20},
  ]},
];

const _venues = [
  { venue:'MetLife Stadium',         city:'New York/New Jersey', country:'USA'    },
  { venue:'SoFi Stadium',            city:'Los Angeles',         country:'USA'    },
  { venue:'AT&T Stadium',            city:'Dallas',              country:'USA'    },
  { venue:"Levi's Stadium",          city:'San Francisco',       country:'USA'    },
  { venue:'Hard Rock Stadium',       city:'Miami',               country:'USA'    },
  { venue:'NRG Stadium',             city:'Houston',             country:'USA'    },
  { venue:'Lincoln Financial Field', city:'Philadelphia',        country:'USA'    },
  { venue:'Arrowhead Stadium',       city:'Kansas City',         country:'USA'    },
  { venue:'Lumen Field',             city:'Seattle',             country:'USA'    },
  { venue:'Estadio Azteca',          city:'Mexico City',         country:'Mexico' },
  { venue:'Estadio Akron',           city:'Guadalajara',         country:'Mexico' },
  { venue:'Estadio BBVA',            city:'Monterrey',           country:'Mexico' },
  { venue:'BC Place',                city:'Vancouver',           country:'Canada' },
  { venue:'BMO Field',               city:'Toronto',             country:'Canada' },
  { venue:'Stade Saputo',            city:'Montreal',            country:'Canada' },
  { venue:'Allegiant Stadium',       city:'Las Vegas',           country:'USA'    },
];

function _addDays(base, n) {
  const d = new Date(base + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().split('T')[0];
}

function _buildGroupMatches() {
  const groupTeams = {};
  for (const t of _teams) {
    if (!groupTeams[t.group_id]) groupTeams[t.group_id] = [];
    groupTeams[t.group_id].push(t.code);
  }
  const groupOrder = 'ABCDEFGHIJKL'.split('');
  const matches = [];
  let num = 1, dayOff = 0;
  for (const g of groupOrder) {
    const [t1, t2, t3, t4] = groupTeams[g];
    const rounds = [[t1,t4],[t2,t3],[t1,t3],[t2,t4],[t1,t2],[t3,t4]];
    let day = dayOff;
    for (let r = 0; r < 6; r++) {
      const v = _venues[num % _venues.length];
      matches.push({ match_number: num++, stage:'group', group_id: g,
        match_date: _addDays('2026-06-11', day), match_time: r%2===0 ? '15:00' : '19:00',
        ...v, home: rounds[r][0], away: rounds[r][1], status:'scheduled' });
      if (r % 2 === 1) day += 2;
    }
    dayOff++;
  }
  return matches;
}

function _buildKnockoutShell() {
  const stages = [
    { stage:'r32',   count:16, startDate:'2026-07-01' },
    { stage:'r16',   count:8,  startDate:'2026-07-07' },
    { stage:'qf',    count:4,  startDate:'2026-07-11' },
    { stage:'sf',    count:2,  startDate:'2026-07-14' },
    { stage:'3rd',   count:1,  startDate:'2026-07-18' },
    { stage:'final', count:1,  startDate:'2026-07-19' },
  ];
  const matches = [];
  let num = 73;
  for (const s of stages) {
    for (let i = 0; i < s.count; i++) {
      const v = _venues[num % _venues.length];
      matches.push({ match_number: num++, stage: s.stage, group_id: null,
        match_date: _addDays(s.startDate, Math.floor(i/2)), match_time: i%2===0 ? '15:00' : '19:00',
        ...v, home: null, away: null, status:'scheduled' });
    }
  }
  return matches;
}

// ── Assemble exports ──────────────────────────────────────────────────────────
export const TEAMS = _teams.map((t, i) => ({ id: i + 1, ...t }));

const _byCode = {};
TEAMS.forEach(t => { _byCode[t.code] = t; });

let _pid = 1;
export const PLAYERS = _starPlayers.flatMap(({ code, players }) => {
  const team = _byCode[code];
  if (!team) return [];
  return players.map(p => ({
    id: _pid++, team_id: team.id, name: p.name, position: p.pos, number: p.num,
    goals: 0, assists: 0,
    team_name: team.name, team_code: team.code, team_flag: team.flag, team_iso2: team.iso2,
  }));
});

export const MATCHES = [..._buildGroupMatches(), ..._buildKnockoutShell()].map((m, i) => {
  const ht = m.home ? _byCode[m.home] : null;
  const at = m.away ? _byCode[m.away] : null;
  return {
    id: i + 1,
    match_number: m.match_number,
    stage: m.stage,
    group_id: m.group_id,
    match_date: m.match_date,
    match_time: m.match_time,
    venue: m.venue,
    city: m.city,
    country: m.country,
    home_team_id:  ht ? ht.id : null,
    away_team_id:  at ? at.id : null,
    home_score: null,
    away_score: null,
    status: m.status,
    home_name: ht ? ht.name : null,
    home_code: ht ? ht.code : null,
    home_flag: ht ? ht.flag : null,
    home_iso2: ht ? ht.iso2 : null,
    away_name: at ? at.name : null,
    away_code: at ? at.code : null,
    away_flag: at ? at.flag : null,
    away_iso2: at ? at.iso2 : null,
  };
});
