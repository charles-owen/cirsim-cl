<?php
/**
 * @file
 * Word chooser for tasks based on a 16 bit subset alphabet
 * supported by the Cirsim character component.
 */

namespace CL\Cirsim\Tasks;

use CL\Grades\GradePart;
use CL\Site\Site;
use CL\Users\User;
use CL\Users\Selector;

/**
 * Class WordChooser
 * Word chooser for tasks based on a 16 bit subset alphabet
 * supported by the Cirsim character component.
 */
class WordChooser extends GradePart {
    /// Result word will not have any duplicate letters
    const UniqueLetters = 'u';

    /// Result word will be required to have duplicate letters
    const DuplicateLetters = 'd';

    /// No filtering at all
    const NoFilter = 'n';

	/**
	 * Constructor
	 * @param string $name A category name for display
	 */
	public function __construct($name) {
		parent::__construct(0, 'grade-cirsim-word-chooser');
		$this->__set("name", $name);
	}

    /**
     * Property get magic method
     *
     * <b>Properties</b>
     * Property | Type | Description
     * -------- | ---- | -----------
     *
     * @param string $property Property name
     * @return mixed
     */
    public function __get($property) {
        switch($property) {


            default:
                return parent::__get($property);
        }
    }

    /**
     * Property set magic method
     *
     * <b>Properties</b>
     * Property | Type | Description
     * -------- | ---- | -----------
     *
     * @param string $property Property name
     * @param mixed $value Value to set
     */
    public function __set($property, $value) {
        switch($property) {
            case 'salt':
                $this->salt = $value;
                break;

            case 'words':
                $this->words = $value;
                break;

            case 'filter':
                $this->filter = $value;
                break;

            default:
                parent::__set($property, $value);
                break;
        }
    }


    /**
	 * Create the grading form for staff use
	 * @param Site $site The Site object
	 * @param User $user User we are grading
	 * @param array $grades Result from call to getUserGrades
	 * @return array describing a grader
	 */
	public function createGrader(Site $site, User $user, array $grades) {
		$data = parent::createGrader($site, $user, $grades);

		$data['status'] = 0;

		$name = $user->displayName;
		$word = $this->get_word($user);

		$data['html'] = "<p>The secret word for $name is $word</p>";
		return $data;
	}

	/**
	 * Compute the grade for this assignment
	 * @param int $memberId Member we are grading
	 * @param array $grades Result from call to getUserGrades
	 * @return array with keys 'points' and optionally 'override'
	 */
	public function computeGrade($memberId, array $grades) {
		return ['points'=>0];
	}

	/**
	 * Get the selected word for a given user
	 * @param User $user
	 * @return string
	 */
	public function get_word(User $user) {
		$selector = new Selector($user, $this->salt);

		if($this->words !== null) {
		    $words = $this->words;
        } else {
            $words = array_merge($this->words7(), $this->words8());
        }

		switch($this->filter) {
            case self::UniqueLetters:
                $words = array_filter($words, function($word) {
                    $len = strlen($word);
                    for($i=0; $i<$len;  $i++) {
                        for($j=$i+1; $j<$len; $j++) {
                            if($word[$i] === $word[$j]) {
                                return false;
                            }
                        }

                    }

                    return true;
                });

                $words = array_values($words);
                break;

            case self::DuplicateLetters:
                $words = array_filter($words, function($word) {
                    $len = strlen($word);
                    for($i=0; $i<$len;  $i++) {
                        for($j=$i+1; $j<$len; $j++) {
                            if($word[$i] === $word[$j]) {
                                return true;
                            }
                        }

                    }

                    return false;
                });
                $words = array_values($words);
                break;
        }

		$ndx = $selector->get_rand() % count($words);
		$word = $words[$ndx];
		return strtoupper($word);
	}

	/**
	 * Present the letters table for the Cirsim letters component.
	 * @return string HTML
	 */
	public function present_table() {
		$html = <<<HTML
<table>
<tr><th>Letter</th><th>Code</th></tr>
HTML;

		for($i=0; $i<count($this->letters); $i++) {
			$letter = $this->letters[$i];
			$binary = sprintf("%04b", $i);
			$html .= "<tr><td class=\"center\">$letter</td><td>$binary</td></tr>";
		}

		$html .= "</table>";
		return $html;
	}

	private $salt = "WordChooser";

	private $words = null;

	private $filter = self::UniqueLetters;

	private $letters = array('A', 'C', 'D', 'E', 'F', 'H', 'I',
		'L', 'M', 'N', 'O', 'R', 'S', 'T',
		'U', 'W');

	private function words7() {
		return array(
			"indorse",
			"inearth",
			"inhaled",
			"inhaler",
			"inhales",
			"inlaced",
			"inlaces",
			"inroads",
			"inshore",
			"instead",
			"inthral",
			"iodates",
			"isolate",
			"isolead",
			"isotach",
			"laciest",
			"lactone",
			"lactose",
			"ladinos",
			"ladrone",
			"ladrons",
			"lancers",
			"lancets",
			"landers",
			"larchen",
			"larches",
			"lardons",
			"latched",
			"latches",
			"lathers",
			"lathier",
			"latices",
			"latinos",
			"latrine",
			"lectins",
			"lection",
			"lectors",
			"lentoid",
			"leotard",
			"lichens",
			"lichted",
			"lictors",
			"linters",
			"lithoed",
			"loaches",
			"loaders",
			"loaners",
			"loathed",
			"loather",
			"loathes",
			"located",
			"locater",
			"locates",
			"lochans",
			"loiters",
			"loricae",
			"nailers",
			"nailset",
			"narcist",
			"narcose",
			"nastier",
			"nectars",
			"neolith",
			"nerdish",
			"nerolis",
			"nidates",
			"nodical",
			"norites",
			"nostril",
			"notched",
			"notcher",
			"notches",
			"noticed",
			"noticer",
			"notices",
			"octanes",
			"oestrin",
			"oilcans",
			"oldster",
			"olestra",
			"oraches",
			"oracles",
			"oralist",
			"orceins",
			"orchids",
			"orchils",
			"ordains",
			"ordeals",
			"ordinal",
			"ordines",
			"orients",
			"ostrich",
			"rachets",
			"raciest",
			"radicel",
			"radices",
			"radicle",
			"ranched",
			"ranches",
			"ranchos",
			"randies",
			"ratches",
			"rathole",
			"ratines",
			"rations",
			"ratline",
			"ratlins",
			"realist",
			"recants",
			"recital",
			"reclads",
			"recoals",
			"recoats",
			"recoils",
			"recoins",
			"redacts",
			"redcoat",
			"redials",
			"redtail",
			"relands",
			"reliant",
			"relicts",
			"reloads",
			"reloans",
			"renails",
			"rentals",
			"rescind",
			"retails",
			"retains",
			"retinal",
			"retinas",
			"retinol",
			"retsina",
			"rialtos",
			"richens",
			"richest",
			"roached",
			"roaches",
			"roadies",
			"roasted",
			"rochets",
			"rodents",
			"rondels",
			"rosined",
			"rotches",
			"sadiron",
			"sainted",
			"salient",
			"saltern",
			"saltier",
			"saltine",
			"saltire",
			"sandier",
			"sandlot",
			"sanicle",
			"santero",
			"sarcoid",
			"sardine",
			"satchel",
			"scaleni",
			"scalier",
			"scanted",
			"scanter",
			"scarlet",
			"scarted",
			"scathed",
			"scholar",
			"scholia",
			"scolder",
			"scoriae",
			"scorned",
			"scrotal",
			"seconal",
			"secondi",
			"section",
			"senator",
			"senhora",
			"shadier",
			"shalier",
			"sheitan",
			"shoaled",
			"shoaler",
			"shorted",
			"shorten",
			"shortia",
			"shortie",
			"shrined",
			"sidecar",
			"slainte",
			"slander",
			"slanted",
			"slather",
			"slatier",
			"slither",
			"snailed",
			"snarled",
			"snorted",
			"solaced",
			"solacer",
			"solated",
			"soldier",
			"solider",
			"sordine",
			"sortied",
			"staider",
			"stained",
			"stainer",
			"stander",
			"stearic",
			"stearin",
			"stencil",
			"sternal",
			"steroid",
			"sthenia",
			"sthenic",
			"stoical",
			"stonier",
			"storied",
			"tacnode",
			"tacrine",
			"tailers",
			"tailors",
			"talcose",
			"talions",
			"taloned",
			"tanrecs",
			"tardies",
			"tarnish",
			"technos",
			"tenails",
			"tendril",
			"thalers",
			"thenars",
			"theriac",
			"therian",
			"theroid",
			"thirled",
			"thorias",
			"thorned",
			"threads",
			"throned",
			"thrones",
			"tincals",
			"tinders",
			"tirades",
			"toadies",
			"toadish",
			"tochers",
			"toenail",
			"toilers",
			"tolanes",
			"torched",
			"torches",
			"torsade",
			"trachle",
			"trailed",
			"trained",
			"tranced",
			"trances",
			"tranche",
			"trashed",
			"treason",
			"trenail",
			"triclad",
			"trindle",
			"triodes",
			"trochal",
			"troches",
			"trochil",
			"troland",
			"amniote",
			"amosite",
			"amounts",
			"anomies",
			"anthems",
			"atheism",
			"atomies",
			"atomise",
			"aunties",
			"automen",
			"etamins",
			"fainest",
			"famines",
			"fantoms",
			"fanwise",
			"fashion",
			"fathoms",
			"fishnet",
			"foments",
			"fomites",
			"fumiest",
			"fustian",
			"haemins",
			"hafnium",
			"heinous",
			"hematin",
			"hetmans",
			"homiest",
			"homines",
			"humates",
			"huswife",
			"inhumes",
			"inmates",
			"mahouts",
			"manihot",
			"manitos",
			"manitou",
			"manitus",
			"manwise",
			"mestino",
			"minuets",
			"minutes",
			"mistune",
			"moisten",
			"mutines",
			"outfawn",
			"outfish",
			"outmans",
			"outswam",
			"outswim",
			"outwash",
			"outwish",
			"santimu",
			"sentimo",
			"sfumato",
			"showman",
			"showmen",
			"sinuate",
			"soutane",
			"tameins",
			"tawnies",
			"timeous",
			"tinamou",
			"townies",
			"townish",
			"tsunami",
			"twasome",
			"unfaith",
			"unshift",
			"unwhite",
			"wahines",
			"wamefou",
			"waniest",
			"washout",
			"whitens",
			"winsome",
		);
	}

	private function words8() {
		return array(
			"achiotes",
			"aconites",
			"acridest",
			"acrolein",
			"acrolith",
			"actioner",
			"actorish",
			"adhesion",
			"aerolith",
			"ailerons",
			"airholes",
			"alienors",
			"althorns",
			"ancestor",
			"anchored",
			"anchoret",
			"aneroids",
			"anethols",
			"anoretic",
			"anorthic",
			"antherid",
			"anticold",
			"antihero",
			"archines",
			"arointed",
			"articled",
			"articles",
			"asteroid",
			"asthenic",
			"astonied",
			"caldrons",
			"calories",
			"candlers",
			"canistel",
			"canister",
			"canoeist",
			"carioles",
			"carlines",
			"carotids",
			"carotins",
			"cartoned",
			"catenoid",
			"cathodes",
			"celadons",
			"centrals",
			"centroid",
			"ceorlish",
			"ceratins",
			"ceratoid",
			"chaldron",
			"chalones",
			"chandler",
			"chanters",
			"chanties",
			"chantors",
			"chariest",
			"chariots",
			"charlies",
			"charnels",
			"chelator",
			"cheloids",
			"children",
			"chitosan",
			"chlorate",
			"chlordan",
			"chloride",
			"chlorids",
			"chlorine",
			"chlorins",
			"chlorite",
			"cholates",
			"cholents",
			"choleras",
			"cholines",
			"chorales",
			"chordate",
			"chorines",
			"chortens",
			"chortled",
			"chortles",
			"christen",
			"cilantro",
			"cisterna",
			"citadels",
			"citherns",
			"cithrens",
			"clarinet",
			"clarions",
			"cloister",
			"clothier",
			"coaliest",
			"coalshed",
			"codeinas",
			"cointers",
			"coistrel",
			"colander",
			"colinear",
			"conelrad",
			"consider",
			"contrail",
			"cordials",
			"cordites",
			"corniest",
			"cortinas",
			"costlier",
			"creatins",
			"creation",
			"daltonic",
			"darioles",
			"decrials",
			"delation",
			"delators",
			"detrains",
			"dialects",
			"diastole",
			"diatrons",
			"dicentra",
			"dicrotal",
			"dilaters",
			"dilators",
			"diocesan",
			"distance",
			"ditchers",
			"doctrine",
			"echidnas",
			"elations",
			"eldritch",
			"enactors",
			"endocast",
			"endosarc",
			"enthrals",
			"entrails",
			"erotical",
			"eschalot",
			"ethanols",
			"ethicals",
			"ethnical",
			"hadronic",
			"hairnets",
			"handiest",
			"handlers",
			"handlist",
			"hardiest",
			"hardline",
			"hardnose",
			"haricots",
			"hedonics",
			"hedonist",
			"helicons",
			"heraldic",
			"heroical",
			"hoariest",
			"holstein",
			"hordeins",
			"horniest",
			"horntail",
			"hotlines",
			"idocrase",
			"idolater",
			"inarched",
			"inarches",
			"inchoate",
			"inclosed",
			"incloser",
			"inearths",
			"inhalers",
			"inholder",
			"insolate",
			"inthrals",
			"intrados",
			"ironclad",
			"islander",
			"isolated",
			"lacertid",
			"lactones",
			"ladrones",
			"lanciers",
			"lardiest",
			"latrines",
			"lections",
			"lentoids",
			"leotards",
			"licensor",
			"loathers",
			"locaters",
			"lodestar",
			"loricate",
			"neoliths",
			"notaries",
			"notchers",
			"notecard",
			"noticers",
			"ordinals",
			"ordinate",
			"oriental",
			"ornithes",
			"rachides",
			"radicels",
			"radicles",
			"randiest",
			"ratholes",
			"rationed",
			"ratlines",
			"reaction",
			"recitals",
			"redcoats",
			"redtails",
			"relation",
			"retinals",
			"retinols",
			"sardonic",
			"scantier",
			"scenario",
			"scleroid",
			"sectoral",
			"sedation",
			"senorita",
			"shetland",
			"shitload",
			"shoalier",
			"snatched",
			"snatcher",
			"snitched",
			"snitcher",
			"societal",
			"sodalite",
			"solander",
			"sonicate",
			"stanched",
			"stancher",
			"starched",
			"sterical",
			"stolider",
			"strained",
			"tacnodes",
			"tacrines",
			"tailored",
			"telsonic",
			"tendrils",
			"theriacs",
			"therians",
			"thinclad",
			"thoraces",
			"toenails",
			"tonsilar",
			"tornadic",
			"tracheid",
			"trachled",
			"trachles",
			"tranches",
			"trenails",
			"triclads",
			"trindles",
			"trinodal",
			"trochils",
			"trochlea",
			"trolands",
			"fawniest",
			"foamiest",
			"hafniums",
			"hematins",
			"houseman",
			"humanest",
			"humanise",
			"humanist",
			"infamous",
			"inswathe",
			"manifest",
			"manihots",
			"manitous",
			"masonite",
			"misatone",
			"outfawns",
			"outshame",
			"outshine",
			"seamount",
			"showtime",
			"somewhat",
			"tinamous",
			"unfaiths",
			"unswathe",
			"wamefous",
			"womanise",
			"womanish",
			"womanist"
		);
	}
}