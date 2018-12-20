<?php
/**
 * Created by PhpStorm.
 * User: charl
 * Date: 1/20/2017
 * Time: 10:51 AM
 */

namespace Cirsim\Tasks;


class PIDConfigurator extends \Cirsim\CirsimConfigurator {

	public function configure(\Assignments\Assignment $assignment,
							  \Cirsim\CirsimViewAux $cirsim, \User $user, $grading=false) {
		$pid = $user->pid;
		if($pid === '') {
			$pid = "A12341234";
		}

		//
		// Mapping from hex values to all display digits plus en=true
		//
		$mapping = array(
			array(0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1),
			array(0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1),
			array(0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1),
			array(0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1),
			array(0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1),
			array(0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1),
			array(0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1),
			array(0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1),
			array(1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1),
			array(1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1),
			array(1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1),
			array(1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1),
			array(1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1),
			array(1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1),
			array(1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1),
			array(1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1)
		);

		// Complete PID test
		$test = array();
		$testA = array();
		$testEN = array();
		for($i=0; $i<16; $i++) {
			$digit = $i < 10 ? chr(48 + $i) : chr(65 + $i - 10);

			if(strpos($pid, $digit) !== false) {
				$add = $mapping[$i];
			} else {
				$add = array(($i >> 3) & 1, ($i >> 2) & 1, ($i >> 1) & 1, $i & 1,
					null, null, null, null, null, null, null, 0);
			}

			$test[] = $add;
			$testA[] = array($add[0], $add[1], $add[2], $add[3], $add[4]);
			$testEN[] = array($add[0], $add[1], $add[2], $add[3], $add[11]);
		}

		/* echo "<pre>";
		for($i=0; $i<16; $i++) {
			echo "$i: " . implode(",", $testEN[$i]) . "\n";
		}
		echo "</pre>"; */

		$cirsim->reset();
		$cirsim->single($assignment->get_tag(), "pidtask", "task2");
		$cirsim->tabs = array("a", "b", "c", "d", "e", "f", "g", "en");

		$cirsim->add_test("Test-All", ["A", "B", "C", "D"],
			["L1-0", "L1-1", "L1-2", "L1-3", "L1-4", "L1-5", "L1-6", "L1-7"], $test);
		$cirsim->add_test("Test-a", ["A", "B", "C", "D"],
			["L1-0"], $testA);
		$cirsim->add_test("Test-en", ["A", "B", "C", "D"],
			["L1-7"], $testEN);
	}
}