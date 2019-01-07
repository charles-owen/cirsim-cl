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


	public function configure(Assignment $assignment,
							  CirsimViewAux $cirsim, User $user, $grading=false) {

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
//		$test = array();
//		$testA = array();
//		$testEN = array();
//		for($i=0; $i<16; $i++) {
//			$digit = $i < 10 ? chr(48 + $i) : chr(65 + $i - 10);
//
//			if(strpos($pid, $digit) !== false) {
//				$add = $mapping[$i];
//			} else {
//				$add = array(($i >> 3) & 1, ($i >> 2) & 1, ($i >> 1) & 1, $i & 1,
//					null, null, null, null, null, null, null, 0);
//			}
//
//			$test[] = $add;
//			$testA[] = array($add[0], $add[1], $add[2], $add[3], $add[4]);
//			$testEN[] = array($add[0], $add[1], $add[2], $add[3], $add[11]);
//		}

		/* echo "<pre>";
		for($i=0; $i<16; $i++) {
			echo "$i: " . implode(",", $testEN[$i]) . "\n";
		}
		echo "</pre>"; */

		$cirsim->reset();
		$cirsim->single($assignment->tag, "hextask");
		$cirsim->tabs = ["a", "b", "c", "d", "e", "f", "g", "en"];
//		$cirsim->add_test("Test-All", ["A", "B", "C", "D"],
//			["L1-0", "L1-1", "L1-2", "L1-3", "L1-4", "L1-5", "L1-6", "L1-7"], $test);
//		$cirsim->add_test("Test-a", ["A", "B", "C", "D"],
//			["L1-0"], $testA);
//		$cirsim->add_test("Test-en", ["A", "B", "C", "D"],
//			["L1-7"], $testEN);
	}

	private $minDigits = 6;
	private $maxDigits = 8;
	private $hex = '';
	private $digits = [];
}