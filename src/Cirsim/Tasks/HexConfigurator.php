<?php
/**
 * @file
 * A Cirsim task that chooses a unique random Hexadecimal string for
 * each student that they have to build a recognizer for.
 */

namespace CL\Cirsim\Tasks;

use CL\Users\User;
use CL\Course\Assignment;
use CL\Cirsim\CirsimViewAux;
use CL\Users\Selector;

/**
 * A Cirsim task that chooses a unique random Hexadecimal string for
 * each student that they have to build a recognizer for.
 */
class HexConfigurator extends \CL\Cirsim\CirsimConfigurator {

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
			case 'hex':
				return $this->hex;

			default:
				return parent::__get($property);
		}
	}

	/**
	 * Configure Cirsim for an assignment.
	 * @param Assignment $assignment Assignment we are configuring for
	 * @param CirsimViewAux $cirsim The Cirsim view object
	 * @param User $user User we are viewing
	 * @param bool $grading True if this is the grading page presentation.
	 */
	public function configure(Assignment $assignment,
							  CirsimViewAux $cirsim, User $user, $grading=false) {
		parent::configure($assignment, $cirsim, $user, $grading);

		$selector = new Selector($user, 'hex-configurator');
		$numDigits = $this->minDigits + $selector->get_rand() % ($this->maxDigits - $this->minDigits + 1);
		$digits = [10];
		$hex = 'A';
		$chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
		while(strlen($hex) < $numDigits) {
			do {
				$digit = $selector->get_rand() % 16;
			} while(in_array($digit, $digits));

			$digits[] = $digit;
			$hex .= $chars[$digit];
		}

		if($user->staff) {
		    $hex = 'AC4D2B';
		    $digits = [10, 12, 4, 13, 2, 11];
        }

		$this->hex = $hex;
		$this->digits = $digits;

		//
		// Mapping from hex values to all display digits plus en=true
		//
		$mapping = array(
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
			[0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
			[0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1],
			[0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
			[0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
			[0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
			[1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
			[1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
			[1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1]
		);

		// Complete test
		$test = [];
		$testA =[];
		$testEN = [];
		for($i=0; $i<16; $i++) {
			$digit = $i < 10 ? chr(48 + $i) : chr(65 + $i - 10);

			if(strpos($hex, $digit) !== false) {
				$add = $mapping[$i];
			} else {
				$add = [($i >> 3) & 1, ($i >> 2) & 1, ($i >> 1) & 1, $i & 1,
					null, null, null, null, null, null, null, 0];
			}

			$test[] = $add;
			$testA[] = [$add[0], $add[1], $add[2], $add[3], $add[4]];
			$testEN[] = [$add[0], $add[1], $add[2], $add[3], $add[11]];
		}

//		echo '<pre>';
//		print_r($testA);
//		echo '</pre>';
		$cirsim->reset();
		$cirsim->single($assignment->tag, "hex-decoder");
		$cirsim->components = ['and', 'or', 'not', 'and3', 'and4', 'or4', 'and4', '7seg'];
		$cirsim->tabs = ["a", "b", "c", "d", "e", "f", "g", "en"];
		$cirsim->option('tabsMenu', false);
		if($user->staff) {
		    $cirsim->answer = '{"grid":8,"circuits":[{"name":"main","width":1920,"height":1080,"components":[{"id":"c1003","x":64,"y":64,"name":"C","type":"InPin","value":true},{"id":"c1005","x":280,"y":72,"name":null,"type":"CircuitRef","circuitName":"a"},{"id":"c1001","x":64,"y":32,"name":"A","type":"InPin","value":true},{"id":"c1002","x":64,"y":48,"name":"B","type":"InPin","value":true},{"id":"c1004","x":64,"y":80,"name":"D","type":"InPin","value":true},{"id":"c1011","x":280,"y":664,"name":null,"type":"CircuitRef","circuitName":"g"},{"id":"c1012","x":280,"y":768,"name":null,"type":"CircuitRef","circuitName":"en"},{"id":"c1038","x":280,"y":560,"name":null,"type":"CircuitRef","circuitName":"f"},{"id":"c1010","x":280,"y":472,"name":null,"type":"CircuitRef","circuitName":"e"},{"id":"c1009","x":280,"y":384,"name":null,"type":"CircuitRef","circuitName":"d"},{"id":"c1008","x":280,"y":280,"name":null,"type":"CircuitRef","circuitName":"c"},{"id":"c1007","x":280,"y":176,"name":null,"type":"CircuitRef","circuitName":"b"},{"id":"c1006","x":560,"y":184,"name":"L1","type":"7seg","color":"green"}],"connections":[{"from":"c1003","out":0,"to":"c1005","in":2,"bends":[]},{"from":"c1003","out":0,"to":"c1007","in":2,"bends":[{"x":176,"y":64},{"x":176,"y":168}]},{"from":"c1003","out":0,"to":"c1008","in":2,"bends":[{"x":176,"y":64},{"x":176,"y":272}]},{"from":"c1003","out":0,"to":"c1009","in":2,"bends":[{"x":176,"y":64},{"x":176,"y":376}]},{"from":"c1003","out":0,"to":"c1011","in":2,"bends":[{"x":176,"y":64},{"x":176,"y":656}]},{"from":"c1003","out":0,"to":"c1012","in":2,"bends":[{"x":176,"y":64},{"x":176,"y":760}]},{"from":"c1003","out":0,"to":"c1038","in":2,"bends":[{"x":176,"y":64},{"x":176,"y":552}]},{"from":"c1005","out":0,"to":"c1006","in":0,"bends":[{"x":432,"y":32},{"x":432,"y":120}]},{"from":"c1001","out":0,"to":"c1005","in":0,"bends":[]},{"from":"c1001","out":0,"to":"c1007","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":136}]},{"from":"c1001","out":0,"to":"c1008","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":240}]},{"from":"c1001","out":0,"to":"c1009","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":344}]},{"from":"c1001","out":0,"to":"c1011","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":624}]},{"from":"c1001","out":0,"to":"c1012","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":728}]},{"from":"c1001","out":0,"to":"c1010","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":448}]},{"from":"c1001","out":0,"to":"c1038","in":0,"bends":[{"x":208,"y":32},{"x":208,"y":520}]},{"from":"c1002","out":0,"to":"c1005","in":1,"bends":[]},{"from":"c1002","out":0,"to":"c1007","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":152}]},{"from":"c1002","out":0,"to":"c1008","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":256}]},{"from":"c1002","out":0,"to":"c1009","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":360}]},{"from":"c1002","out":0,"to":"c1011","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":640}]},{"from":"c1002","out":0,"to":"c1012","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":744}]},{"from":"c1002","out":0,"to":"c1010","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":464}]},{"from":"c1002","out":0,"to":"c1038","in":1,"bends":[{"x":192,"y":48},{"x":192,"y":536}]},{"from":"c1004","out":0,"to":"c1005","in":3,"bends":[]},{"from":"c1004","out":0,"to":"c1007","in":3,"bends":[{"x":160,"y":80},{"x":160,"y":184}]},{"from":"c1004","out":0,"to":"c1008","in":3,"bends":[{"x":160,"y":80},{"x":160,"y":288}]},{"from":"c1004","out":0,"to":"c1009","in":3,"bends":[{"x":160,"y":80},{"x":160,"y":392}]},{"from":"c1004","out":0,"to":"c1012","in":3,"bends":[{"x":160,"y":80},{"x":160,"y":776}]},{"from":"c1004","out":0,"to":"c1038","in":3,"bends":[{"x":160,"y":80},{"x":160,"y":568}]},{"from":"c1004","out":0,"to":"c1011","in":3,"bends":[{"x":160,"y":80},{"x":160,"y":672}]},{"from":"c1011","out":0,"to":"c1006","in":6,"bends":[{"x":448,"y":624},{"x":448,"y":216}]},{"from":"c1012","out":0,"to":"c1006","in":7,"bends":[{"x":464,"y":728},{"x":464,"y":248}]},{"from":"c1038","out":0,"to":"c1006","in":5,"bends":[{"x":432,"y":520},{"x":432,"y":200}]},{"from":"c1010","out":0,"to":"c1006","in":4,"bends":[{"x":416,"y":448},{"x":416,"y":184}]},{"from":"c1009","out":0,"to":"c1006","in":3,"bends":[{"x":400,"y":344},{"x":400,"y":168}]},{"from":"c1008","out":0,"to":"c1006","in":2,"bends":[{"x":384,"y":240},{"x":384,"y":152}]},{"from":"c1007","out":0,"to":"c1006","in":1,"bends":[]}]},{"name":"a","width":1920,"height":1080,"components":[{"id":"c1001","x":88,"y":136,"name":"A","type":"InPin","value":false},{"id":"c1017","x":384,"y":232,"name":null,"type":"And"},{"id":"c1005","x":712,"y":168,"name":"O1","type":"OutPin"},{"id":"c1018","x":200,"y":136,"name":null,"type":"Inverter"},{"id":"c1019","x":200,"y":200,"name":null,"type":"Inverter"},{"id":"c1020","x":200,"y":344,"name":null,"type":"Inverter"},{"id":"c1002","x":88,"y":200,"name":"B","type":"InPin","value":false},{"id":"c1003","x":88,"y":272,"name":"C","type":"InPin","value":false},{"id":"c1004","x":88,"y":344,"name":"D","type":"InPin","value":false},{"id":"c1016","x":376,"y":144,"name":null,"type":"And"},{"id":"c1015","x":520,"y":160,"name":null,"type":"Or"}],"connections":[{"from":"c1001","out":0,"to":"c1018","in":0,"bends":[]},{"from":"c1001","out":0,"to":"c1016","in":0,"bends":[{"x":136,"y":88},{"x":328,"y":88}]},{"from":"c1017","out":0,"to":"c1015","in":1,"bends":[{"x":472,"y":232}]},{"from":"c1018","out":0,"to":"c1017","in":0,"bends":[{"x":264,"y":136},{"x":264,"y":216}]},{"from":"c1019","out":0,"to":"c1017","in":1,"bends":[{"x":232,"y":248}]},{"from":"c1020","out":0,"to":"c1016","in":1,"bends":[{"x":312,"y":344},{"x":312,"y":160}]},{"from":"c1002","out":0,"to":"c1019","in":0,"bends":[]},{"from":"c1004","out":0,"to":"c1020","in":0,"bends":[]},{"from":"c1016","out":0,"to":"c1015","in":0,"bends":[]},{"from":"c1015","out":0,"to":"c1005","in":0,"bends":[]}]},{"name":"b","width":1920,"height":1080,"components":[{"id":"c1001","x":120,"y":64,"name":"A","type":"InPin","value":false},{"id":"c1006","x":248,"y":64,"name":null,"type":"Inverter"},{"id":"c1007","x":248,"y":136,"name":null,"type":"Inverter"},{"id":"c1025","x":384,"y":344,"name":null,"type":"And"},{"id":"c1024","x":360,"y":232,"name":null,"type":"And"},{"id":"c1027","x":248,"y":208,"name":null,"type":"Inverter"},{"id":"c1026","x":248,"y":280,"name":null,"type":"Inverter"},{"id":"c1022","x":488,"y":80,"name":null,"type":"Or"},{"id":"c1004","x":120,"y":280,"name":"D","type":"InPin","value":false},{"id":"c1003","x":120,"y":208,"name":"C","type":"InPin","value":false},{"id":"c1002","x":120,"y":136,"name":"B","type":"InPin","value":false},{"id":"c1005","x":736,"y":288,"name":"O1","type":"OutPin"},{"id":"c1023","x":608,"y":288,"name":null,"type":"Or"}],"connections":[{"from":"c1001","out":0,"to":"c1006","in":0,"bends":[]},{"from":"c1006","out":0,"to":"c1022","in":0,"bends":[]},{"from":"c1007","out":0,"to":"c1024","in":0,"bends":[{"x":312,"y":136}]},{"from":"c1025","out":0,"to":"c1023","in":1,"bends":[{"x":560,"y":344}]},{"from":"c1024","out":0,"to":"c1022","in":1,"bends":[{"x":440,"y":232}]},{"from":"c1027","out":0,"to":"c1025","in":0,"bends":[{"x":296,"y":208},{"x":296,"y":328}]},{"from":"c1026","out":0,"to":"c1024","in":1,"bends":[{"x":280,"y":248}]},{"from":"c1022","out":0,"to":"c1023","in":0,"bends":[{"x":560,"y":80}]},{"from":"c1004","out":0,"to":"c1026","in":0,"bends":[]},{"from":"c1004","out":0,"to":"c1025","in":1,"bends":[{"x":168,"y":360}]},{"from":"c1003","out":0,"to":"c1027","in":0,"bends":[]},{"from":"c1002","out":0,"to":"c1007","in":0,"bends":[]},{"from":"c1023","out":0,"to":"c1005","in":0,"bends":[]}]},{"name":"c","width":1920,"height":1080,"components":[{"id":"c1001","x":104,"y":72,"name":"A","type":"InPin","value":false},{"id":"c1002","x":104,"y":112,"name":"B","type":"InPin","value":false},{"id":"c1003","x":104,"y":160,"name":"C","type":"InPin","value":false},{"id":"c1004","x":104,"y":200,"name":"D","type":"InPin","value":false},{"id":"c1006","x":448,"y":112,"name":null,"type":"Or"},{"id":"c1007","x":352,"y":88,"name":null,"type":"And"},{"id":"c1008","x":224,"y":112,"name":null,"type":"Inverter"},{"id":"c1028","x":584,"y":128,"name":null,"type":"Or"},{"id":"c1005","x":696,"y":128,"name":"O1","type":"OutPin"},{"id":"c1029","x":240,"y":32,"name":null,"type":"Inverter"},{"id":"c1030","x":256,"y":224,"name":null,"type":"Inverter"},{"id":"c1031","x":376,"y":280,"name":null,"type":"And"}],"connections":[{"from":"c1001","out":0,"to":"c1029","in":0,"bends":[]},{"from":"c1001","out":0,"to":"c1031","in":0,"bends":[]},{"from":"c1002","out":0,"to":"c1008","in":0,"bends":[]},{"from":"c1003","out":0,"to":"c1030","in":0,"bends":[]},{"from":"c1004","out":0,"to":"c1028","in":1,"bends":[]},{"from":"c1006","out":0,"to":"c1028","in":0,"bends":[]},{"from":"c1007","out":0,"to":"c1006","in":0,"bends":[]},{"from":"c1008","out":0,"to":"c1031","in":1,"bends":[]},{"from":"c1028","out":0,"to":"c1005","in":0,"bends":[]},{"from":"c1029","out":0,"to":"c1007","in":0,"bends":[]},{"from":"c1030","out":0,"to":"c1007","in":1,"bends":[]},{"from":"c1031","out":0,"to":"c1006","in":1,"bends":[]}]},{"name":"d","width":1920,"height":1080,"components":[{"id":"c1001","x":72,"y":80,"name":"A","type":"InPin","value":false},{"id":"c1002","x":72,"y":128,"name":"B","type":"InPin","value":false},{"id":"c1003","x":72,"y":176,"name":"C","type":"InPin","value":false},{"id":"c1004","x":72,"y":224,"name":"D","type":"InPin","value":false},{"id":"c1005","x":200,"y":80,"name":null,"type":"Inverter"},{"id":"c1006","x":216,"y":128,"name":null,"type":"Inverter"},{"id":"c1008","x":624,"y":120,"name":"O1","type":"OutPin"},{"id":"c1010","x":472,"y":120,"name":null,"type":"Or"},{"id":"c1032","x":544,"y":200,"name":null,"type":"Or"},{"id":"c1033","x":336,"y":72,"name":null,"type":"And"},{"id":"c1034","x":336,"y":168,"name":null,"type":"And"},{"id":"c1035","x":192,"y":176,"name":null,"type":"Inverter"}],"connections":[{"from":"c1001","out":0,"to":"c1005","in":0,"bends":[]},{"from":"c1001","out":0,"to":"c1034","in":0,"bends":[]},{"from":"c1002","out":0,"to":"c1006","in":0,"bends":[]},{"from":"c1003","out":0,"to":"c1035","in":0,"bends":[]},{"from":"c1004","out":0,"to":"c1032","in":1,"bends":[]},{"from":"c1005","out":0,"to":"c1033","in":0,"bends":[]},{"from":"c1006","out":0,"to":"c1033","in":1,"bends":[]},{"from":"c1010","out":0,"to":"c1032","in":0,"bends":[]},{"from":"c1032","out":0,"to":"c1008","in":0,"bends":[]},{"from":"c1033","out":0,"to":"c1010","in":0,"bends":[]},{"from":"c1034","out":0,"to":"c1010","in":1,"bends":[]},{"from":"c1035","out":0,"to":"c1034","in":1,"bends":[]}]},{"name":"e","width":1920,"height":1080,"components":[{"id":"c1003","x":304,"y":128,"name":null,"type":"Inverter"},{"id":"c1036","x":184,"y":56,"name":"A","type":"InPin","value":false},{"id":"c1001","x":184,"y":128,"name":"B","type":"InPin","value":false},{"id":"c1037","x":408,"y":72,"name":null,"type":"Or"},{"id":"c1002","x":536,"y":72,"name":"O1","type":"OutPin"}],"connections":[{"from":"c1003","out":0,"to":"c1037","in":1,"bends":[]},{"from":"c1036","out":0,"to":"c1037","in":0,"bends":[]},{"from":"c1001","out":0,"to":"c1003","in":0,"bends":[]},{"from":"c1037","out":0,"to":"c1002","in":0,"bends":[]}]},{"name":"f","width":1920,"height":1080,"components":[{"id":"c1039","x":120,"y":72,"name":"A","type":"InPin","value":true},{"id":"c1040","x":120,"y":136,"name":"B","type":"InPin","value":false},{"id":"c1041","x":120,"y":200,"name":"C","type":"InPin","value":true},{"id":"c1042","x":120,"y":272,"name":"D","type":"InPin","value":false},{"id":"c1043","x":240,"y":136,"name":null,"type":"Inverter"},{"id":"c1044","x":240,"y":200,"name":null,"type":"Inverter"},{"id":"c1045","x":240,"y":272,"name":null,"type":"Inverter"},{"id":"c1046","x":456,"y":136,"name":null,"type":"And"},{"id":"c1047","x":448,"y":232,"name":null,"type":"And"},{"id":"c1048","x":584,"y":224,"name":null,"type":"Or"},{"id":"c1049","x":712,"y":232,"name":"O1","type":"OutPin"}],"connections":[{"from":"c1039","out":0,"to":"c1046","in":0,"bends":[]},{"from":"c1040","out":0,"to":"c1043","in":0,"bends":[]},{"from":"c1041","out":0,"to":"c1044","in":0,"bends":[]},{"from":"c1042","out":0,"to":"c1045","in":0,"bends":[]},{"from":"c1043","out":0,"to":"c1046","in":1,"bends":[]},{"from":"c1044","out":0,"to":"c1047","in":0,"bends":[]},{"from":"c1045","out":0,"to":"c1047","in":1,"bends":[]},{"from":"c1046","out":0,"to":"c1048","in":0,"bends":[]},{"from":"c1047","out":0,"to":"c1048","in":1,"bends":[]},{"from":"c1048","out":0,"to":"c1049","in":0,"bends":[]}]},{"name":"g","width":1920,"height":1080,"components":[{"id":"c1001","x":144,"y":120,"name":"A","type":"InPin","value":false},{"id":"c1002","x":144,"y":176,"name":"B","type":"InPin","value":false},{"id":"c1003","x":144,"y":224,"name":"C","type":"InPin","value":false},{"id":"c1004","x":608,"y":136,"name":"O1","type":"OutPin"},{"id":"c1005","x":256,"y":176,"name":null,"type":"Inverter"},{"id":"c1007","x":488,"y":136,"name":null,"type":"Or"},{"id":"c1050","x":592,"y":240,"name":null,"type":"Or"},{"id":"c1051","x":272,"y":72,"name":null,"type":"Inverter"},{"id":"c1052","x":144,"y":288,"name":"D","type":"InPin","value":false}],"connections":[{"from":"c1001","out":0,"to":"c1051","in":0,"bends":[]},{"from":"c1002","out":0,"to":"c1005","in":0,"bends":[]},{"from":"c1005","out":0,"to":"c1050","in":1,"bends":[]},{"from":"c1007","out":0,"to":"c1050","in":0,"bends":[]},{"from":"c1050","out":0,"to":"c1004","in":0,"bends":[]},{"from":"c1051","out":0,"to":"c1007","in":0,"bends":[]},{"from":"c1052","out":0,"to":"c1007","in":1,"bends":[]}]},{"name":"en","width":1920,"height":1080,"components":[{"id":"c1003","x":56,"y":96,"name":"A","type":"InPin","value":false},{"id":"c1004","x":56,"y":160,"name":"B","type":"InPin","value":false},{"id":"c1006","x":56,"y":272,"name":"D","type":"InPin","value":true},{"id":"c1005","x":56,"y":216,"name":"C","type":"InPin","value":true},{"id":"c1014","x":216,"y":216,"name":null,"type":"Inverter"},{"id":"c1009","x":216,"y":272,"name":null,"type":"Inverter"},{"id":"c1008","x":216,"y":160,"name":null,"type":"Inverter"},{"id":"c1010","x":392,"y":376,"name":null,"type":"And3"},{"id":"c1011","x":392,"y":440,"name":null,"type":"And3"},{"id":"c1012","x":392,"y":504,"name":null,"type":"And3"},{"id":"c1013","x":392,"y":568,"name":null,"type":"And3"},{"id":"c1002","x":656,"y":400,"name":"O1","type":"OutPin"},{"id":"c1001","x":528,"y":400,"name":null,"type":"Or4"}],"connections":[{"from":"c1003","out":0,"to":"c1012","in":0,"bends":[{"x":160,"y":96},{"x":160,"y":488}]},{"from":"c1003","out":0,"to":"c1013","in":0,"bends":[{"x":160,"y":96},{"x":160,"y":552}]},{"from":"c1004","out":0,"to":"c1008","in":0,"bends":[]},{"from":"c1004","out":0,"to":"c1011","in":0,"bends":[{"x":144,"y":160},{"x":144,"y":424}]},{"from":"c1004","out":0,"to":"c1013","in":1,"bends":[{"x":144,"y":160},{"x":144,"y":568}]},{"from":"c1006","out":0,"to":"c1009","in":0,"bends":[]},{"from":"c1005","out":0,"to":"c1010","in":1,"bends":[{"x":128,"y":216},{"x":128,"y":376}]},{"from":"c1005","out":0,"to":"c1014","in":0,"bends":[]},{"from":"c1005","out":0,"to":"c1012","in":2,"bends":[{"x":128,"y":216},{"x":128,"y":520}]},{"from":"c1014","out":0,"to":"c1011","in":1,"bends":[{"x":296,"y":216},{"x":296,"y":440}]},{"from":"c1014","out":0,"to":"c1013","in":2,"bends":[{"x":296,"y":216},{"x":296,"y":584}]},{"from":"c1009","out":0,"to":"c1010","in":2,"bends":[{"x":280,"y":272},{"x":280,"y":392}]},{"from":"c1009","out":0,"to":"c1011","in":2,"bends":[{"x":280,"y":272},{"x":280,"y":456}]},{"from":"c1008","out":0,"to":"c1010","in":0,"bends":[{"x":312,"y":160},{"x":312,"y":360}]},{"from":"c1008","out":0,"to":"c1012","in":1,"bends":[{"x":312,"y":160},{"x":312,"y":504}]},{"from":"c1010","out":0,"to":"c1001","in":0,"bends":[]},{"from":"c1011","out":0,"to":"c1001","in":1,"bends":[{"x":440,"y":392}]},{"from":"c1012","out":0,"to":"c1001","in":2,"bends":[{"x":456,"y":504},{"x":456,"y":408}]},{"from":"c1013","out":0,"to":"c1001","in":3,"bends":[{"x":480,"y":568}]},{"from":"c1001","out":0,"to":"c1002","in":0,"bends":[]}]}],"snap":true}';
        }

		if($this->grading) {
			$cirsim->save = false;
		}

		$cirsim->add_test("Test-All", ["A", "B", "C", "D"],
			["L1-0", "L1-1", "L1-2", "L1-3", "L1-4", "L1-5", "L1-6", "L1-7"], $test);
		$cirsim->add_test("Test-a", ["A", "B", "C", "D"],
			["L1-0"], $testA);
		$cirsim->add_test("Test-en", ["A", "B", "C", "D"],
			["L1-7"], $testEN);
	}

	/**
	 * Get any additional information to present on the
	 * assignment grading page.
	 * @return string HTML
	 */
	public function gradingInfo() {
		$html = parent::gradingInfo();

		$html .= <<<HTML
<p class="center">Student hex value is: $this->hex</p>
HTML;

		return $html;
	}

	private $minDigits = 6;
	private $maxDigits = 8;
	private $hex = '';
	private $digits = [];
}